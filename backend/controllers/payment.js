const paymentService = require("../services/payment"); // Ödeme servisinin içeri aktarılması
const payment = require("../models/payment"); 
const logger = require("../utils/logger");

const paymentController = {
  processPayment: async (req, res) => {
    const { orderId, amount, paymentMethod } = req.body;

    if (!orderId || !amount || !paymentMethod) {
      logger.warn("Payment attempt with missing data", {
        orderId,
        amount,
        paymentMethod,
      });
      return res
        .status(400)
        .send({
          message: "Order ID, amount, and payment method are required!",
        });
    }

    try {
      // Öncelikle, aynı orderId ile ödeme yapılmış mı kontrol et
      const existingPayment = await payment.findOne({ orderId });

      if (existingPayment) {
        logger.warn("Payment already processed for this order ID", { orderId });
        return res.status(400).send({ 
          success: false,message: "This order has already been processed." });
      }

      // Sipariş ID'si ile ödeme işlemi başlat
      const paymentResult = await paymentService.createPayment({
        orderId,
        amount,
        paymentMethod,
      });

      if (paymentResult.error) {
        // Eğer paymentResult.error varsa, hata oluşmuş demektir
        logger.warn("Payment failed", { orderId, amount, error: paymentResult.error });
        return res.status(400).send({ 
        success: false, message: paymentResult.error });
      }

      // Ödeme başarılı ise
      logger.info("Payment created successfully", {
        paymentId: paymentResult._id,
        orderId,
        amount,
      });

      return res.status(200).send({
        success: true,
        message: "Payment successful",
        paymentId: paymentResult._id,
      });
    } catch (e) {
      // Beklenmedik hata durumu
      logger.error("Error during payment processing", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = paymentController;
