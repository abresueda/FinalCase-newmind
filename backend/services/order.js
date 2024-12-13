const mongooseOrder = require("../models/order");
const kafka = require("../utils/kafka");
const logger = require("../utils/logger");

async function getAllOrder() {
  try {
    const getAllOrder = await mongooseOrder
      .find()
      .populate("userId", "email name"); // User bilgilerini de getiriyoruz
    logger.info("Fetched all orders successfully", {
      ordersCount: getAllOrder.length,
    });
    return getAllOrder;
  } catch (e) {
    logger.error("Error fetching all orders", {
      error: e.message,
      stack: e.stack,
    });
    return false;
  }
}

async function getSingleOrder(params) {
  const id = params.id;
  try {
    const getSingleOrder = await mongooseOrder
      .findById(id)
      .populate("userId", "email name");
    if (getSingleOrder) {
      logger.info("Fetched single order successfully", { orderId: id });
    } else {
      logger.warn("Order not found", { orderId: id });
    }
    return getSingleOrder;
  } catch (e) {
    logger.error("Error fetching single order", {
      error: e.message,
      stack: e.stack,
      orderId: id,
    });
    return false;
  }
}

async function createOrder(params) {
  const { userId, products } = params;

  try {
    const newOrder = new mongooseOrder({
      userId, // UserID, ObjectId olarak geliyor ve User koleksiyonuna referans.
      products, // Ürünler, Object olarak kaydediliyor.
    });

    const savedOrder = await newOrder.save();
    if (savedOrder) {
      logger.info("Order created successfully", {
        orderId: savedOrder._id,
        userId,
      });
      kafka.sendMessage("order", `orderId:${savedOrder.id}`);
      logger.info("Kafka message sent for order", { orderId: savedOrder._id });
      return true;
    } else {
      logger.warn("Order creation failed", { userId });
      return false;
    }
  } catch (e) {
    logger.error("Error creating order", {
      error: e.message,
      stack: e.stack,
      userId,
    });
    return false;
  }
}

async function updateOrder(params) {
  const { id, products } = params;
  try {
    const order = await mongooseOrder.findById(id);
    if (!order) {
      logger.warn("Order not found for update", { orderId: id });
      return false;
    }

    // Ürünleri güncelleme işlemi
    order.products = products;

    const updatedOrder = await order.save();
    logger.info("Order updated successfully", { orderId: updatedOrder._id });
    return updatedOrder;
  } catch (e) {
    logger.error("Error updating order", {
      error: e.message,
      stack: e.stack,
      orderId: id,
    });
    return false;
  }
}

async function deleteOrder(params) {
  const id = params.id;
  try {
    const orderDelete = await mongooseOrder.findByIdAndDelete(id);
    if (orderDelete) {
      logger.info("Order deleted successfully", { orderId: id });
    } else {
      logger.warn("Order not found for deletion", { orderId: id });
    }
    return orderDelete;
  } catch (e) {
    logger.error("Error deleting order", {
      error: e.message,
      stack: e.stack,
      orderId: id,
    });
    return false;
  }
}

module.exports = {
  getAllOrder,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
