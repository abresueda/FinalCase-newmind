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
      const response = await authService.login(req.body);
      logger.info("User login successful", { email: req.body.email });
      res.status(200).send({ response: response });
    } catch (e) {
      logger.error("Error during user login", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  register: async (req, res) => {
    try {
      const response = await userService.createUser(req.body);
      logger.info("User registration successful", { email: req.body.email });
      res.status(200).send({ response: response });
    } catch (e) {
      logger.error("Error during user registration", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = authController;
