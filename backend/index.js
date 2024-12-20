const express = require("express");
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
  origin: "http://localhost:5173",  // Frontend'in portu
}));

const server = http.createServer(app);
const io = socketIo(server);

//Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Log Http Request
//BUNU NEDEN YAZDIK DÜZENLE
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
  console.log("Bir kullanıcı bağlandı.");

  socket.on("disconnect", () => {
    console.log("bir kullanıcı bağlantıyı kesti");
  })

  io.emit("message", "mesaj test")
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
/*app.listen(3000,() => {
    console.log('ayaktayiz');
})*/
const PORT = process.env.PORT || 3000; // PORT çevresel değişkenden alınır, yoksa 3000 kullanılır
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
