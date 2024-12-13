//Loginden gelen kullanıcının bilgileri eşleşiyorsa, jwt token verilir. Ona göre geçiş yapılır.
const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../utils/logger");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  //Tokeni ayrıştırıp dizinin ikinci elemanını alıyoruz.
  const token = authHeader?.split(" ")[1];

  //Token kontrolü.
  if (!token) {
    logger.warn("Authentication token is missing");
    return res
      .status(401)
      .json({ message: "Authentication token is missing." });
  }

  //JWT_SECRET kontrolü
  if (!process.env.JWT_SECRET) {
    const error = new Error(
      "JWT_SECRET is not defined in the environment variables"
    );
    logger.error(error.message); // Hata logu
    throw error; // Hata fırlatılır
  }

  try {
    //Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    logger.info("Token verified successfully", { userId: decoded.id });
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      logger.warn("Token has expired");
      return res.status(401).json({ message: "Token has expired" });
    }
    
    logger.error("Token verification error", { error: e.message }); // Hata logu
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
