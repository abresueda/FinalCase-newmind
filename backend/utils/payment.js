const { sendMessage } = require("./kafka");

async function processPayment(orderId, amount) {
  try {
    console.log(`Processing payment for Order ID: ${orderId}, Amount: ${amount}`);
    
    // Ödeme mantığını burada işleyebilirsiniz
    const paymentStatus = "success"; // Ödeme başarılı/başarısız durumu

    // Kafka'ya ödeme durumu mesajını gönderin
    await sendMessage("payment-status", { orderId, amount, status: paymentStatus });

    return { orderId, status: paymentStatus };
  } catch (error) {
    console.error("Error processing payment:", error.message);
    throw new Error("Payment processing failed");
  }
}

module.exports = {
  processPayment,
};
