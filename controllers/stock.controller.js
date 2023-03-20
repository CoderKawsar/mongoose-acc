const {
  getStocksService,
  getAStockByIdService,
  createAStockService,
  updateAStockService,
  deleteAStockService,
} = require("../services/stock.service");

exports.getStocks = async (req, res) => {
  try {
    let filters = { ...req.query };

    // sort, limit, page
    const excludeFields = ["sort", "limit", "page"];
    excludeFields.forEach((field) => {
      delete filters[field];
    });

    // gt, lt, gte, lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, "$$$1");
    filters = JSON.parse(filterString);

    const queries = {};

    // select
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      delete filters["fields"];
    }

    // sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    // page
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      queries.page = parseInt(page);
      queries.limit = parseInt(limit);
      queries.skip = (page - 1) * limit;
    }

    const result = await getStocksService(filters, queries);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get Stocks",
    });
  }
};

exports.getAStockById = async (req, res) => {
  try {
    const result = await getAStockByIdService(req.params.id);

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't find any stock item",
      });
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the stock item",
    });
  }
};

exports.createStock = async (req, res) => {
  try {
    const result = await createAStockService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created a stock item",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't create a stock item",
    });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const result = await updateAStockService(req.params.id, req.body);
    if (result.modifiedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully updated the stock item",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the stock item",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't update the stock item",
    });
  }
};

exports.deleteAStock = async (req, res) => {
  try {
    const result = await deleteAStockService(req.params.id);
    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully deleted the stock item",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't delete the stock item",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't delete the stock item",
    });
  }
};
