const mongoose = require("mongoose");

// Ödeme modelinin şeması
const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Payment", paymentSchema);
