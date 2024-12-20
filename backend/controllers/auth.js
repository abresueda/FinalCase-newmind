const userService = require("../services/user");
const authService = require("../services/auth");
const logger = require("../utils/logger");

const authController = {
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      logger.warn("Login attempt with missing email or password");
      return res
        .status(400)
        .send({ message: "Email and Password are required!" });
    }

    try {
      // Service'ten gelen yanıtı bekliyoruz
      const response = await authService.login(req.body);

      if (response.status === 200) {
        // Başarılı giriş
        logger.info("User login successful", { email: req.body.email });
        res
          .status(200)
          .send({ message: response.message, token: response.token });
      } else {
        // Hata durumu
        res.status(response.status).send({ message: response.message });
      }
    } catch (e) {
      // Beklenmedik hata durumu
      logger.error("Error during user login", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  register: async (req, res) => {
    if (!req.body.password) {
      logger.warn("Password is required");
      return res.status(400).send({ message: "Password is required!" });
    }

    try {
      //Kullanıcı oluşturma isteği
      const response = await userService.createUser(req.body);

      if (response.success === false) {
        // Hata durumu
        logger.warn(response.message, { email: req.body.email });
        return res.status(response.status).send({ message: response.message });
      }
      
      // Başarılı kayıt
      logger.info("User registration successful", { email: req.body.email });
      return res.status(201).send({ message: "User registered successfully" });
      
    } catch (e) {
      //Beklenmedik hata mesajı
      logger.error("Error during user registration", {
        error: e.message,
      });

      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = authController;
