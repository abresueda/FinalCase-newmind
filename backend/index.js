const express = require("express");
const path = require("path");
const cors = require('cors');
const routes = require("./routes/index");
const mongoose = require("mongoose");
const config = require("./config/db");
const redis = require("./utils/redis");
const logger = require("./utils/logger");
// Socketi http aracılığıyla ayağa kaldırmak için
const http = require("http"); 
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
// CORS'u tüm originler için açma
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Statik dosya servisi
app.use("/public", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

// Socket.io için CORS ayarı
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"], // İzin verilen HTTP metodları
    credentials: true, // Çerez paylaşımına izin ver
  },
});

//Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Log Http Request
app.use((req,res,next) => {
  logger.http(`${req.method} - ${req.url}`);
  next();
})

//Redis Connection
redis.redisCon();

//Database connect process
config.connectDB();

//Socket Bağlantısı
io.on("connection",(socket) => {
  logger.info("A user connected");

  // Ödeme işlemi başarılı olduğunda frontend'e bildirim gönder
  socket.on("paymentSuccess", () => {
    socket.emit("message", {
      title: "Payment Successful",
      description: "Your payment was processed successfully.",
    });
  });

  socket.on("disconnect", () => {
    logger.info("A user disconnected");
  })

})

app.get("/sendMessage",(req,res) => {
  const camping = {
    id: 1,
    title: "yeni bir indirim var size özel",
    description:"....."
  }
  io.emit("message", camping);
  res.status(200).send({message: "iletildi"});
})

//Örnek Router
app.get(
  "/test",
  function (req, res, next) {
    logger.info("Test middleware triggered");
    next();
  },
  function (req, res) {
    logger.info("Test controller executed");
    res.status(200).send({ success: true });
  }
);

//Main Routes
app.use("/api", routes);

//Server
const PORT = process.env.PORT || 3000; // PORT çevresel değişkenden alınır, yoksa 3000 kullanılır
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
