const logger = require("../utils/logger");
const orderService = require("../services/order");
const kafka = require("../utils/kafka");

// Yardımcı fonksiyon: Parametre doğrulama
const validateRequest = (requiredFields, body) => {
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }
  return null;
};

const orderController = {
  createOrder: async (req, res) => {
    const { userId, products } = req.body;

    // Parametre doğrulama
    const validationError = validateRequest(["userId", "products"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

  
    try {
      const response = await orderService.createOrder(req.body);
      logger.info("Order created successfully", { userId });
      res.status(201).send({ response });
    } catch (error) {
      logger.error("Error creating order", { userId, error: error.message });
      res.status(500).send({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  },

  updateOrder: async (req, res) => {
    const { userId, products } = req.body;

    const validationError = validateRequest(["userId", "products"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try {
      const response = await orderService.updateOrder(req.body);
      logger.info("Order updated successfully", { userId });
      res.status(200).send({ response });
    } catch (error) {
      logger.error("Error updating order", { userId, error: error.message });
      res.status(500).send({ message: "An unexpected error occurred. Please try again later." });
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try {
      const response = await orderService.deleteOrder(id);
      logger.info("Order deleted successfully", { id });
      res.status(200).send({ response });
    } catch (error) {
      logger.error("Error deleting order", { id, error: error.message });
      res.status(500).send({ message: "An unexpected error occurred. Please try again later." });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const response = await orderService.getAllOrder();
      logger.info("Fetched all orders successfully");
      res.status(200).send({ response });
    } catch (error) {
      logger.error("Error fetching all orders", { error: error.message });
      res.status(500).send({ message: "An unexpected error occurred. Please try again later." });
    }
  },

  getSingleOrder: async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try {
      const response = await orderService.getSingleOrder(id);
      logger.info("Fetched single order successfully", { id });
      res.status(200).send({ response });
    } catch (error) {
      logger.error("Error fetching single order", { id, error: error.message });
      res.status(500).send({ message: "An unexpected error occurred. Please try again later." });
    }
  },
};

module.exports = orderController;
