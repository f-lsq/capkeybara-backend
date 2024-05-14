const orderDataLayer = require('../data-access-layer/orders');

async function getAllBuyerOrders(buyerId) {
  try {
    const allOrders = await orderDataLayer.getAllBuyerOrders(buyerId);  
    return allOrders;
  } catch (e) {
    throw new Error(e);
  }
}

async function getAllSellerOrders(sellerId) {
  try {
    const allOrders = await orderDataLayer.getAllSellerOrders(sellerId);  
    return allOrders;
  } catch (e) {
    throw new Error(e);
  }
}

async function createOrder(orderData){
  try {
      const newOrder = await orderDataLayer.createOrder(orderData);
      return newOrder;
    } catch(e) {
    throw new Error(e);
  }
}

async function createOrderItem(orderId, productId, quantity){
  try {
      const newOrderItem = await orderDataLayer.createOrderItem(orderId, productId, quantity);
      return newOrderItem;
    } catch(e) {
    throw new Error(e);
  }
}

async function getOrder(orderId) {
  try {
    const order = await orderDataLayer.getOrder(orderId);  
    return order;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateOrderStatus(orderId, orderStatus) {
  try {
    const order = await orderDataLayer.updateOrderStatus(orderId, orderStatus);  
    return order;
  } catch (e) {
    throw new Error(e);
  }
}


module.exports = {
  getAllBuyerOrders,
  getAllSellerOrders,
  createOrder,
  createOrderItem,
  getOrder,
  updateOrderStatus
};