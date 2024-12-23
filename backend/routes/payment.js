const express = require("express");
const paymentController = require("../controllers/payment");
const router = express.Router();

// Ödeme işlemi rotası
router.post("/process-payment", paymentController.processPayment);

module.exports = router;
