const logger = require("../utils/logger");
const productService = require("../services/product");
const kafka = require("../utils/kafka");
const { searchProducts, addProduct } = require("../utils/elasticsearch");

// Yardımcı fonksiyon: Parametre doğrulama
const validateRequest = (requiredFields, body) => {
  const missingFields = requiredFields.filter(
    (field) =>
      body[field] === undefined || body[field] === null || body[field] === ""
  );
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }
  return null;
};

const productController = {
  createProduct: async (req, res) => {
    const { name, price, color, stock, description, category, img } = req.body;

    // Parametre doğrulama
    const validationError = validateRequest(["name", "price"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try {
      const response = await productService.createProduct(req.body);
      await addProduct(req.body);
      logger.info("Product created successfully", { name, response });
      res.status(201).send({ response });
    } catch (e) {
      logger.error(e, "Error creating product!", { error: error.message });
      res.status(400).send({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    const { name, color, price, stock } = req.body;

    const validationError = validateRequest(["name", "price"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try {
      const response = await productService.updateProduct(req.body);
      logger.info("Product updated successfully", { name, response });
    res.status(200).send({ response });
    }catch(e) {
      logger.error(e, "Error updating product!", { error: error.message });
      res.status(400).send({ message: error.message });
    } 
  },

  deleteProduct: async (req, res) => {
    const { id } = req.body;

    const validationError = validateRequest(["id"], req.body);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try {
      const response = await productService.deleteProduct(id);
      logger.info("Product deleted successfully", { id, response });
      res.status(200).send({ response });
    }catch(e){
      logger.error(e, "Error deleting product!", { error: error.message });
      res.status(400).send({ message: error.message });
    }
    
  },

  getAllProduct: async (req, res) => {
    try {
      const response = await productService.getAllProduct();
      logger.info("Fetched all products successfully");
      res.status(200).send({ response });
    }catch(e){
      logger.error(e, "Error fetching all products!", { error: error.message });
      res.status(400).send({ message: error.message });
    }
  },

  getSingleProduct: async (req, res) => {
    const { id } = req.params;

    const validationError = validateRequest(["id"], req.params);
    if (validationError) {
      logger.warn(validationError);
      return res.status(400).send({ message: validationError });
    }

    try{
      const response = await productService.getSingleProduct(id);
    logger.info("Fetched single product successfully", { id, response });
    res.status(200).send({ response });
    }catch(e){
      logger.error(e, "Error fetching product!", { error: e.message });
      res.status(400).send({ message: e.message });
    }
  },

  searchProduct: async (req, res) => {
    const { text } = req.params;

    try {
      const response = await searchProducts(text);

      if (response.length === 0) {
        logger.info("No products found for the search term", {
          searchTerm: text,
        });
        return res.status(404).send({ message: "No products found" });
      }

      logger.info("Fetched products successfully", { response });
      res.status(200).send({ response });
    } catch (e) {
      logger.error(`Failed to search products: ${e.message}`);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
  //Categori ile filtreleme yapmak için.
  filterByCategory: async (req, res) => {
    const { category } = req.params; // Kategoriyi URL'den al
  
    if (!category) {
      logger.warn("Category parameter is missing");
      return res.status(400).send({ message: "Category parameter is required" });
    }
  
    try {
      const response = await productService.getProductsByCategory(category); // Service katmanında filtreleme
      if (response.length === 0) {
        logger.info("No products found for the specified category", { category });
        return res.status(404).send({ message: "No products found in this category" });
      }
  
      logger.info("Fetched products by category successfully", { category, response });
      res.status(200).send({ response });
    } catch (e) {
      logger.error(e, "Error fetching products by category!", { error: e.message });
      res.status(500).send({ message: "Internal Server Error" });
    }
  },  
};

module.exports = productController;
