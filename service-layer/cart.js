const cartDataLayer = require('../data-access-layer/cart');

async function getCartItem(buyerId) {
  try {
    const cartItems = await cartDataLayer.getCartItem(buyerId);

    // Could add some recommendation business logic based on shopping cart item
  
    return cartItems;
  } catch (e) {
    throw new Error(e);
  }
}

// Increment of 1
async function addToCart(buyerId, productId, quantity) {
  try {
    const cartItem = await cartDataLayer.getCartItemByBuyerAndProduct(buyerId, productId);
    if (cartItem) {
      return await cartDataLayer.updateCartItemQuantity(buyerId, productId, cartItem.get('quantity')+1)
    } else {
      return await cartDataLayer.createCartItem(buyerId, productId, quantity);
    }
  } catch {
    throw new Error(e);
  }
}

// Reduction by 1
async function removeFromCart(buyerId, productId) {
  try {
    const cartItem = await cartDataLayer.getCartItemByBuyerAndProduct(buyerId, productId);
    if (cartItem) {
      if (cartItem.get('quantity') > 0) {
        return await cartDataLayer.updateCartItemQuantity(buyerId, productId, cartItem.get('quantity')-1)
      } else {
        return null;
      }
    } else {
      return cartItem // null
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function updateCartItemQuantity(buyerId, productId, newQuantity) {
  try {
    const updatedCartItem = await cartDataLayer.updateCartItemQuantity(buyerId, productId, newQuantity);
    return updatedCartItem;
  } catch (e) {
    throw new Error(e);
  }
}

async function removeCartItem(buyerId, productId) {
  try {
    const removedCartItem = await cartDataLayer.removeCartItem(buyerId, productId);
    return removedCartItem;
  } catch (e) {
    throw new Error(e);
  }
}

async function getCartTotalPrice(buyerId) {
  try {
    let cartItems = await cartDataLayer.getCartItem(buyerId);
    cartItems = cartItems.toJSON();
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      const cartItemTotalPrice = cartItem.quantity * cartItem.product.price;
      totalPrice += cartItemTotalPrice;
    })    
    return totalPrice;
  } catch (e) {
    throw new Error(e);
  }
}

async function clearCartItems(buyerId) {
  try {
    let cartItems = await cartDataLayer.getCartItem(buyerId);
    cartItems = cartItems.toJSON();
    cartItems.forEach(async (cartItem) => {
      await cartDataLayer.removeCartItem(buyerId, cartItem.product.id);
    })
    return cartItems;
  } catch (e) {
    throw new Error(e);
  }
}



module.exports = {
  getCartItem,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  removeCartItem,
  getCartTotalPrice,
  clearCartItems
};