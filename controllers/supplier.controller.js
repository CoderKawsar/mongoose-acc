const {
  getSuppliersService,
  createSupplierService,
  updateASupplierService,
  deleteASupplierService,
  getASupplierByIdService,
} = require("../services/supplier.service");

exports.getSuppliers = async (req, res) => {
  try {
    const result = await getSuppliersService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't get Suppliers",
    });
  }
};

exports.getASupplierById = async (req, res) => {
  try {
    const result = await getASupplierByIdService(req.params.id);

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Couldn't find any supplier",
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
      message: "Couldn't get the supplier",
    });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created a supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't create a supplier",
    });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const result = await updateASupplierService(req.params.id, req.body);
    if (result.modifiedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully updated the supplier",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the supplier",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't update the supplier",
    });
  }
};

exports.deleteASupplier = async (req, res) => {
  try {
    const result = await deleteASupplierService(req.params.id);
    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully deleted the supplier",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't delete the store",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
      message: "Couldn't delete the store",
    });
  }
};
