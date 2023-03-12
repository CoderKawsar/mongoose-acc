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
    const filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => {
      delete filters[field];
    });

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      delete filters["fields"];
    }

    if (req.query.limit) {
      queries.limit = req.query.limit;
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
