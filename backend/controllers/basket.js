const basketService = require("../services/basket");
const logger = require("../utils/logger");

const validateFields = (fields, res) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      logger.warn(`${key} is required`);
      res.status(400).send({ message: `${key} is required` });
      return false;
    }
  }
  return true;
};

const basketController = {
  createBasket: async (req, res) => {
    const { userId, product } = req.body;
    if (!validateFields({ userId, product: product?.productId }, res)) return;

    try {
      const response = await basketService.addToCart(req.body);
      logger.info("Basket created successfully", { userId, product });
      res.status(201).send({ response });
    } catch (e) {
      logger.error("Error creating basket", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updateBasket: async (req, res) => {
    const { userId, products } = req.body;
    if (!validateFields({ userId, products }, res)) return;

    try {
      const response = await basketService.updateBasket(req.body);
      logger.info("Basket updated successfully", { userId, products });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error updating basket", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  deleteBasket: async (req, res) => {
    const { userId, productId } = req.body;
    if (!validateFields({ userId, productId }, res)) return;

    try {
      const response = await basketService.removeFromCart(req.body);
      logger.info("Product removed from basket", { userId, productId });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error removing product from basket", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  clearBasket: async (req, res) => {
    const { userId } = req.body;
    if (!validateFields({ userId }, res)) return;

    try {
      const response = await basketService.clearBasket(req.body);
      logger.info("Basket cleared successfully", { userId });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error clearing basket", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getBasket: async (req, res) => {
    const { userId } = req.params;
    if (!validateFields({ userId }, res)) return;

    try {
      const response = await basketService.getBasket(req.params);
      logger.info("Basket fetched successfully", { userId });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error fetching basket", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  getSingleBasket: async (req, res) => {
    const { userId, basketId } = req.body;
    if (!validateFields({ userId, basketId }, res)) return;

    try {
      const response = await basketService.getSingleBasket(req.body);
      logger.info("Single basket fetched successfully", { userId, basketId });
      res.status(200).send({ response });
    } catch (e) {
      logger.error("Error fetching single basket", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = basketController;
