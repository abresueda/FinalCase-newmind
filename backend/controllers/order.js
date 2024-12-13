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

// Hata sarmalayıcı: Tekrar eden try-catch yapısını azaltır
const controllerHandler = (controllerFunction) => async (req, res) => {
  try {
    await controllerFunction(req, res);
  } catch (error) {
    logger.error("Controller Error", { error: error.message });
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const orderController = {
  createOrder: controllerHandler(async (req, res) => {
    const { userId, products } = req.body;

    // Parametre doğrulama
    const validationError = validateRequest(["userId", "products"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await orderService.createOrder(req.body);
    logger.info("Order created successfully", { userId, response });
    res.status(201).send({ response });
  }),

  updateOrder: controllerHandler(async (req, res) => {
    const { userId, products } = req.body;

    const validationError = validateRequest(["userId", "products"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await orderService.updateOrder(req.body);
    logger.info("Order updated successfully", { userId, response });
    res.status(200).send({ response });
  }),

  deleteOrder: controllerHandler(async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await orderService.deleteOrder(id);
    logger.info("Order deleted successfully", { id, response });
    res.status(200).send({ response });
  }),

  getAllOrder: controllerHandler(async (req, res) => {
    const response = await orderService.getAllOrder();
    logger.info("Fetched all orders successfully");
    res.status(200).send({ response });
  }),

  getSingleOrder: controllerHandler(async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await orderService.getSingleOrder(id);
    logger.info("Fetched single order successfully", { id, response });
    res.status(200).send({ response });
  }),
};

module.exports = orderController;
