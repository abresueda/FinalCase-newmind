const mongoose = require("mongoose");

//Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    }
  },
  {
    strict: true
  }
);

module.exports = mongoose.model("Product", productSchema);
