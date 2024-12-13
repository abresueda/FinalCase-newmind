const mongoose = require("mongoose");

// Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // User koleksiyonuna referans
      ref: "User", // User modeline referans
      required: true, // Siparişin bir kullanıcıya ait olması zorunlu
    },
    products: [
      {
        type: Object,
        required: true, // Ürünlerin her siparişte olması gerektiğini varsayıyoruz
      },
    ],
  },
  { timestamps: true }
); // createdAt ve updatedAt alanlarını otomatik olarak ekler

module.exports = mongoose.model("Order", orderSchema);
