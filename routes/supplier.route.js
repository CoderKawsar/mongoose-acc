const express = require("express");
const supplierController = require("../controllers/supplier.controller");

const router = express.Router();

router
  .route("/")
  .get(supplierController.getSuppliers)
  .post(supplierController.createSupplier);

router
  .route("/:id")
  .get(supplierController.getASupplierById)
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteASupplier);

module.exports = router;
