const userService = require("../services/user");
const kafka = require("../utils/kafka");
const logger = require("../utils/logger");

const userController = {
  getUser: async (req, res) => {
    try {
      const response = await userService.getUser(req.params);
      logger.info("User fetched successfully", {
        params: req.params,
        response,
      });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error fetching user", {
        error: e.message,
        stack: e.stack,
        params: req.params,
      });
      res
        .status(500)
        .send({ message: "An error occurred while fetching the user" });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const response = await userService.getAllUser();
      logger.info("Users fetched successfully", { response });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error fetching users", {
        error: e.message,
        stack: e.stack,
      });
      res
        .status(500)
        .send({ message: "An error occurred while fetching the users" });
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const response = await userService.updateUser(req.body);
      logger.info("User updated successfully", {
        requestBody: req.body,
        response,
      });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error updating user", {
        error: e.message,
        stack: e.stack,
        requestBody: req.body,
      });
      res
        .status(500)
        .send({ message: "An error occurred while updating the user" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const response = await userService.deleteUser(req.params);
      logger.info("User deleted successfully", {
        params: req.params,
        response,
      });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error deleting user", {
        error: e.message,
        stack: e.stack,
        params: req.params,
      });
      res
        .status(500)
        .send({ message: "An error occurred while deleting the user" });
    }
  },

  createOrder: async (req, res) => {
    try {
      kafka.sendMessage("test2", "test3");
      logger.info("Kafka message sent successfully", {
        topic: "test2",
        message: "test3",
      });
      res.status(200).send({ response: [] });
    } catch (e) {
      logger.error("Error creating order", {
        error: e.message,
        stack: e.stack,
      });
      res
        .status(500)
        .send({ message: "An error occurred while creating the order" });
    }
  },
};

module.exports = userController;
