const express = require("express");
const orderController = require("../controllers/order"); // Import without destructuring

const router = express.Router();

router.post("/", orderController.createOrder);
router.put("/", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getSingleOrder);

module.exports = router;
