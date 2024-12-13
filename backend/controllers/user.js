const userService = require("../services/user");
const kafka = require("../utils/kafka");
const logger = require("../utils/logger");

const handleControllerAction = async (
  res,
  action,
  successMessage,
  errorMessage,
  logData = {}
) => {
  try {
    const response = await action();
    logger.info(successMessage, { ...logData, response });
    res.status(200).send({ response });
  } catch (error) {
    logger.error(errorMessage, {
      error: error.message,
      stack: error.stack,
      ...logData,
    });
    res.status(500).send({ message: errorMessage });
  }
};

const userController = {
  updateUser: (req, res) => {
    handleControllerAction(
      res,
      () => userService.updateUser(req.body),
      "User updated successfully",
      "Error updating user",
      { userId: req.body.id }
    );
  },

  deleteUser: (req, res) => {
    handleControllerAction(
      res,
      () => userService.deleteUser(req.params),
      "User deleted successfully",
      "Error deleting user",
      { userId: req.params.id }
    );
  },

  getUser: (req, res) => {
    handleControllerAction(
      res,
      () => userService.getUser(req.params),
      "User retrieved successfully",
      "Error retrieving user",
      { userId: req.params.id }
    );
  },

  getAllUser: (req, res) => {
    handleControllerAction(
      res,
      () => userService.getAllUser(),
      "Users retrieved successfully",
      "Error retrieving users"
    );
  },

  createOrder: (req, res) => {
    handleControllerAction(
      res,
      () => {
        kafka.sendMessage("test2", "test3");
        return Promise.resolve(); // Simulate a successful Kafka operation
      },
      "Kafka message sent",
      "Error creating order",
      { topic: "test2", message: "test3" }
    );
  },
};

module.exports = userController;
