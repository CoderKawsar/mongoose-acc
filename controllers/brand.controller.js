const {
  createBrandService,
  getBrandsService,
  getABrandService,
  updateABrandService,
  deleteABrandService,
} = require("../services/brand.service");

exports.getBrands = async (req, res) => {
  try {
    const result = await getBrandsService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the brands",
    });
  }
};

exports.getABrand = async (req, res) => {
  try {
    const brand = await getABrandService(req.params.id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't find any brand",
      });
    }

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get the brand",
    });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't create a brand",
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const result = await updateABrandService(req.params.id, req.body);
    if (result.modifiedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully updated the brand",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the brand",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't update the brand",
    });
  }
};

exports.deleteABrand = async (req, res) => {
  try {
    const result = await deleteABrandService(req.params.id);
    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully deleted the brand",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't delete the brand",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't delete the brand",
    });
  }
};
