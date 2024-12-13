const logger = require("../utils/logger");
const { createClient } = require("redis");
const redis = require("../utils/redis");

/*let redisClient;

async function createRedisClient() {
  if (!redisClient) {
    redisClient = await createClient()
      .on("error", (err) => logger.error("Redis Client Error", err))
      .connect();
  }
  return redisClient;
}*/

async function addToCart(params) {
  const { userId, product } = params;
  const cartKey = userId;

  try {
    logger.info(`Adding product to cart for user ${userId}`);

    const client = await redisCon(); // Redis bağlantısı
    const getBasket = (await client.get(cartKey))
      ? JSON.parse(await client.get(cartKey))
      : [];

    getBasket.push(product);
    await client.set(cartKey, JSON.stringify(getBasket));

    logger.info(`Product added to cart for user ${userId}`, {
      cart: getBasket,
    });
    return true;
  } catch (e) {
    logger.error(
      `Error adding product to cart for user ${userId}: ${e.message}`,
      e
    );
    return { success: false, message: "Error adding product to cart" };
  }
}

async function getBasket(params) {
  const { userId } = params;
  const cartKey = userId;

  try {
    logger.info(`Fetching cart for user ${userId}`);

    const client = await redisCon(); // Redis bağlantısı.
    const value = await client.get(cartKey);

    if (!value) {
      logger.warn(`No cart found for user ${userId}`);
      return [];
    }

    return JSON.parse(value);
  } catch (e) {
    logger.error(`Error fetching cart for user ${userId}: ${e.message}`, e);
    return { success: false, message: "Error fetching cart" };
  }
}

async function removeFromCart(params) {
  const { userId, productId } = params;

  try {
    logger.info(
      `Removing product with ID ${productId} from cart for user ${userId}`
    );

    const client = await redisCon(); // Redis bağlantısı.
    const getBasket = (await client.get(userId))
      ? JSON.parse(await client.get(userId))
      : [];
    const indexToRemove = getBasket.findIndex(
      (product) => product.productId === productId
    );

    if (indexToRemove !== -1) {
      getBasket.splice(indexToRemove, 1);
      await client.set(userId, JSON.stringify(getBasket));
      logger.info(`Product removed from cart for user ${userId}`, {
        cart: getBasket,
      });
      return true;
    } else {
      logger.warn(
        `Product with ID ${productId} not found in cart for user ${userId}`
      );
      return { success: false, message: "Product not found in cart" };
    }
  } catch (e) {
    logger.error(
      `Error removing product from cart for user ${userId}: ${e.message}`,
      e
    );
    return { success: false, message: "Error removing product from cart" };
  }
}

async function clearBasket(params) {
  const { userId } = params;

  try {
    logger.info(`Clearing cart for user ${userId}`);

    const client = await redisCon(); // Redis bağlantısı.
    await client.set(userId, "");

    logger.info(`Cart cleared for user ${userId}`);
    return true;
  } catch (e) {
    logger.error(`Error clearing cart for user ${userId}: ${e.message}`, e);
    return { success: false, message: "Error clearing cart" };
  }
}

module.exports = {
  addToCart,
  getBasket,
  removeFromCart,
  clearBasket,
};
