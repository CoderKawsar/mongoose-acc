const express = require("express");
// const multer = require("multer");
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");

const router = express.Router();
// const uploader = multer({ dest: "images/" });

// router.post(
//   "/file-upload",
//   uploader.single("image"),
//   productController.fileUpload
// );
router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);
router.route("/seed-db/:productNo").post(productController.seedProducts);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
