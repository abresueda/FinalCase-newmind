const logger = require("../utils/logger");
const productService = require("../services/product");
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

const productController = {
  createProduct: controllerHandler(async (req, res) => {
    const { name, price } = req.body;

    // Parametre doğrulama
    const validationError = validateRequest(["name", "price"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await productService.createProduct(req.body);
    logger.info("Product created successfully", { name, response });
    res.status(201).send({ response });
  }),

  updateProduct: controllerHandler(async (req, res) => {
    const { name, price } = req.body;

    const validationError = validateRequest(["name", "price"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await productService.updateProduct(req.body);
    logger.info("Product updated successfully", { name, response });
    res.status(200).send({ response });
  }),

  deleteProduct: controllerHandler(async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await productService.deleteProduct(id);
    logger.info("Product deleted successfully", { id, response });
    res.status(200).send({ response });
  }),

  getAllProduct: controllerHandler(async (req, res) => {
    const response = await productService.getAllProduct();
    logger.info("Fetched all products successfully");
    res.status(200).send({ response });
  }),

  getSingleProduct: controllerHandler(async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    const response = await productService.getSingleProduct(id);
    logger.info("Fetched single product successfully", { id, response });
    res.status(200).send({ response });
  }),
};

module.exports = productController;
