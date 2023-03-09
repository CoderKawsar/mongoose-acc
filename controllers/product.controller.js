const {
  getProductService,
  createProductService,
  updateProductService,
} = require("../services/product.services");

module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductService();

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
