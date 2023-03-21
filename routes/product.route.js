const express = require("express");
// const multer = require("multer");
const productController = require("../controllers/product.controller");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
// const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
// const uploader = multer({ dest: "images/" });

// router.use(verifyToken);

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

router
  .route("/bulk-update")
  .patch(authorization("admin"), productController.bulkUpdateProduct);
router
  .route("/bulk-delete")
  .delete(authorization("admin"), productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manage"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(
    authorization("admin", "store-manage"),
    productController.deleteProduct
  );

module.exports = router;
