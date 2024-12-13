const mongoose = require("mongoose");

//Kullanıcı şeması tanımlanıyor.
const userSchema = new mongoose.Schema({
  //Kullanıcı adı
  username: {
    type: String,
    required: true,
    trim: true,
  },

  //Kullanıcı e-posta adresi
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // E-posta formatı doğrulama
    trim: true,
  },

  //Kullanıcı şifresi
  password: {
    type: String,
    required: true,
  },

  // Kullanıcı hesabı oluşturulma tarihi
  createdAt: {
    type: Date,
    default: Date.now, // Eğer değer verilmezse, oluşturulma anının tarihi otomatik olarak alınır
  },
});

module.exports = mongoose.model("user", userSchema);
