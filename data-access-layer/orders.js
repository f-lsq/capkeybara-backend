const { OrderItem, Order } = require("../models");

const getAllOrders = async (buyerId) => {
  return await Order.collection().where({
    'buyer_id': buyerId
  }).fetch({
    require: false,
    withRelated: [
      'order_items', 
      'order_items.product',
      'order_items.product.category'
    ]
  })
}

const createOrder = async (orderData) => {
  try {
    const newOrder = new Order({
      ...orderData,
      date_created: new Date()
    })
    await newOrder.save();
    return newOrder;
  } catch(e) {
    throw new Error(e);
  }
}

const createOrderItem = async (orderId, productId, quantity) => {
  const orderItem = new OrderItem({
    order_id: orderId,
    product_id: productId,
    quantity: quantity
  })

  await orderItem.save()
  return orderItem;
}

const getOrder = async (orderId) => {
  return await Order.where({
    'id': orderId
  }).fetch({
    require: false,
    withRelated: [
      'order_items', 
      'order_items.product',
      'order_items.product.category'
    ]
  })
}

const updateOrderStatus = async (orderId, orderStatus) => {
  const order = await getOrder(orderId);
  if (order) {
    order.set('order_status', orderStatus);
    if (orderStatus === "Delivered") {
      order.set('date_fulfilled', new Date());
    }
    console.log(order.toJSON())
    await order.save();
    return order;
  } else {
    return order; // null
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  createOrderItem,
  getOrder,
  updateOrderStatus
};