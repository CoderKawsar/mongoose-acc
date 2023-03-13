const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductService,
  bulkDeleteProductService,
  seedProductsService,
} = require("../services/product.services");

module.exports.getProducts = async (req, res, next) => {
  try {
    // removing sort/page/limit strings from req.query(filters)
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => {
      delete filters[field];
    });

    // for .select which fields to show
    const queries = {};
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      delete filters["fields"];
    }

    // gt, lt, gte, lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    // if sort given
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    // if limit given fetch it or limit=10
    if (req.query.limit) {
      queries.limit = parseInt(req.query.limit);
    } else {
      queries.limit = 10;
    }

    // if page given
    if (req.query.page) {
      queries.page = parseInt(req.query.page);
    } else {
      queries.page = 1;
    }

    const products = await getProductService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get data",
      error: error.message,
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  try {
    // using save
    const result = await createProductService(req.body);

    result.logger();

    res.status(200).json({
      status: "success",
      message: "Product saved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data not saved",
      error: error.message,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const result = await updateProductService(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update data",
      error: error.message,
    });
  }
};

module.exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update data",
      error: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id);

    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Couldn't delete data",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete data",
      error: error.message,
    });
  }
};

module.exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "Products deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete products",
      error: error.message,
    });
  }
};

module.exports.seedProducts = async (req, res) => {
  try {
    const result = await seedProductsService(+req.params.productNo);
    res.status(200).json({
      status: "success",
      message: "Products seeded successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't seed products",
      error: error.message,
    });
  }
};
