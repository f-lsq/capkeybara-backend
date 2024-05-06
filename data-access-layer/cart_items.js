
const { CartItem} = require('../models'); 

const getCartItem = async (buyerId) => {
  return await CartItem.collection().where({
    'buyer_id': buyerId
  }).fetch({
    require: false,
    withRelated: ['product', 'product.category']
  })
}

const getCartItemByBuyerAndProduct = async (buyerId, productId) => {
  return await CartItem.where({
    'buyer_id': buyerId,
    'product_id': productId
  }).fetch({
    require: false
  })
}

const createCartItem = async (buyerId, productId, quantity) => {
  const cartItem = new CartItem({
    buyer_id: buyerId,
    product_id: productId,
    quantity: quantity
  })

  await cartItem.save()
  return cartItem;
}

const updateCartItemQuantity = async (buyerId, productId, newQuantity) => {
  const cartItem = await getCartItemByBuyerAndProduct(buyerId, productId);
  if (cartItem) {
    cartItem.set('quantity', newQuantity);
    await cartItem.save();
    return cartItem;
  } else {
    return cartItem // null
  }
}

const removeCartItem = async (buyerId, productId) => {
  const cartItem = await getCartItemByBuyerAndProduct(buyerId, productId);
  if (cartItem) {
    const removedCartItem = cartItem.toJSON();
    await cartItem.destroy();
    return removedCartItem;
  } else {
    return cartItem // null
  }
}



module.exports = {
  getCartItem,
  getCartItemByBuyerAndProduct,
  createCartItem,
  updateCartItemQuantity,
  removeCartItem
}

