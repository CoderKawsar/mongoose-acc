const express = require("express");
const stockController = require("../controllers/stock.controller");

const router = express.Router();

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

router
  .route("/:id")
  .get(stockController.getAStockById)
  .patch(stockController.updateStock)
  .delete(stockController.deleteAStock);

module.exports = router;
