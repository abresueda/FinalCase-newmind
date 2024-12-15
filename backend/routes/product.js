const express = require("express");
const productController = require("../controllers/product"); // Import without destructuring

const router = express.Router();

router.post("/", productController.createProduct);
router.put("/", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getSingleProduct);

router.get("/search/:text", productController.searchProduct);

module.exports = router;
