const mongooseProduct = require("../models/product");
const { createClient } = require("redis");
const logger = require("../utils/logger");

let redisClient;

async function createRedisClient() {
  if (!redisClient) {
    redisClient = await createClient()
      .on("error", (err) =>
        logger.error("Redis Client Error", {
          error: err.message,
          stack: err.stack,
        })
      )
      .connect();
  }
  return redisClient;
}

async function getAllProduct() {
  const key = "showcase";
  try {
    const client = await createRedisClient();
    const getShowCase = await client.get(key);

    if (getShowCase === null) {
      // İlk veritabanından alıyor, sonra cache (Redis) kullanarak daha hızlı işlem yapıyoruz.
      const getAllProduct = await mongooseProduct.find();
      await client.set(key, JSON.stringify(getAllProduct));
      logger.info("Fetched all products from database and cached", {
        productsCount: getAllProduct.length,
      });
      return getAllProduct;
    } else {
      logger.info("Fetched products from Redis cache");
      return JSON.parse(getShowCase);
    }
  } catch (e) {
    logger.error("Error fetching all products", {
      error: e.message,
      stack: e.stack,
    });
    return false;
  }
}

async function getSingleProduct(params) {
  const id = params.id;
  try {
    const getSingleProduct = await mongooseProduct.findById(id);
    if (!getSingleProduct) {
      logger.warn("Product not found", { productId: id });
      return { error: "Product not found" };
    }
    logger.info("Fetched single product successfully", { productId: id });
    return getSingleProduct;
  } catch (e) {
    logger.error("Error fetching single product", {
      error: e.message,
      stack: e.stack,
      productId: id,
    });
    return false;
  }
}

async function createProduct(params) {
  const { title, price, color, stock } = params;
  try {
    const newProduct = new mongooseProduct({
      title,
      price,
      color,
      stock,
    });
    const savedProduct = await newProduct.save();
    if (savedProduct) {
      logger.info("Product created successfully", {
        productId: savedProduct._id,
        title,
      });
      return true;
    } else {
      logger.warn("Failed to create product", { title });
      return false;
    }
  } catch (e) {
    logger.error("Error creating product", {
      error: e.message,
      stack: e.stack,
      title,
    });
    return false;
  }
}

async function updateProduct(params) {
  const { id, title, price, color, stock } = params;
  try {
    const product = await mongooseProduct.findById(id);
    if (!product) {
      logger.warn("Product not found for update", { productId: id });
      return false;
    }
    product.title = title;
    product.price = price;
    product.color = color;
    product.stock = stock;
    const updatedProduct = await product.save();
    logger.info("Product updated successfully", {
      productId: updatedProduct._id,
    });
    return updatedProduct;
  } catch (e) {
    logger.error("Error updating product", {
      error: e.message,
      stack: e.stack,
      productId: id,
    });
    return false;
  }
}

async function deleteProduct(params) {
  const id = params.id;
  try {
    const productDelete = await mongooseProduct.findByIdAndDelete(id);
    if (productDelete) {
      logger.info("Product deleted successfully", { productId: id });
    } else {
      logger.warn("Product not found for deletion", { productId: id });
      return { error: "Product not found for deletion" };
    }
    return productDelete;
  } catch (e) {
    logger.error("Error deleting product", {
      error: e.message,
      stack: e.stack,
      productId: id,
    });
    return false;
  }
}

module.exports = {
  getAllProduct,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
