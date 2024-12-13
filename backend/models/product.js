const mongoose = require("mongoose");

//Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // İsim zorunlu
      trim: true, // Boşlukları kırpar
    },
    price: {
      type: Number, 
      required: true,
      min: 0, // Negatif fiyatların önüne geçer
    },
    color: {
      type: String,
      required: false, // Renk opsiyonel olabilir
      trim: true,
    },
    stock: {
      type: Number,
      required: true, // Stok sayısı zorunlu
      min: 0, // Negatif stokları önler
    },
  },
  {
    timestamps: true, // Oluşturulma ve güncellenme tarihlerini otomatik ekler
  }
);

module.exports = mongoose.model("Product", productSchema);
