const { processPayment } = require("./payment");

async function createInvoice(orderId, amount) {
  console.log(`Creating invoice for Order ID: ${orderId}, Amount: ${amount}`);
  
  // Ödeme işlemini başlatın
  const paymentResult = await processPayment(orderId, amount);

  if (paymentResult.status === "success") {
    console.log("Payment successful, invoice created.");
    return { orderId, amount, invoiceStatus: "created" };
  } else {
    console.log("Payment failed, invoice not created.");
    return { orderId, amount, invoiceStatus: "failed" };
  }
}

module.exports = {
  createInvoice,
};
