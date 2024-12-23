const Payment = require("../models/payment"); // Payment modelini içeri aktar
const mongooseOrder = require("../models/order");
const logger = require("../utils/logger"); // Logger'ı içeri aktar

async function createPayment(params) {
  const { orderId, amount, paymentMethod } = params;
  try {
    // OrderId'nin geçerli bir sipariş olup olmadığını kontrol edin
    const order = await mongooseOrder.findById(orderId);  // Order modelinizin doğru şekilde ilişkilendirildiğinden emin olun
    if (!order) {
      logger.warn("Order not found for payment", { orderId });
      return { error: "Order not found" };
    }

    // Yeni bir ödeme kaydını oluştur
    const newPayment = new Payment({
      orderId,
      amount,
      paymentMethod,
    });

    // Veritabanına ödeme kaydını kaydet
    const savedPayment = await newPayment.save();
    if (savedPayment) {
      logger.info("Payment created successfully", {
        paymentId: savedPayment._id,
        orderId,
        amount,
      });
      return savedPayment; // Başarıyla kaydedilen ödeme bilgisi döndürülür
    } else {
      logger.warn("Failed to create payment", { orderId });
      return { error: "Failed to create payment" };
    }
  } catch (e) {
    // Hata durumunda
    logger.error("Error creating payment", {
      error: e.message,
      stack: e.stack,
      orderId,
    });
    return { error: e.message };
  }
}

module.exports = {
  createPayment,
};
