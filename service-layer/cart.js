const cartDataLayer = require('../data-access-layer/cart');
const productDataLayer = require('../data-access-layer/products');

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
    const product = await productDataLayer.getProductById(productId);
    const quantity_available = product.get('quantity_available');
   
    if (cartItem) {
      // If product is already in cart, check if the quantity to be added exceed what is avaiable in the product database
      const quantity_in_cart = cartItem.get('quantity');
      if (quantity_in_cart < quantity_available) {
        return await cartDataLayer.updateCartItemQuantity(buyerId, productId, quantity_in_cart+1)
      }
      else {
        return null;
      }
    } else {
      // If product is not in the cart, check if quantity to be added is less than or equal to what is avaiable in the database
      if (quantity <= quantity_available) {
        return await cartDataLayer.createCartItem(buyerId, productId, quantity);
      }
      else {
        return null;
      }
    }
  } catch (e) {
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
      return null;
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function updateCartItemQuantity(buyerId, productId, newQuantity) {
  try {
    const product = await productDataLayer.getProductById(productId);
    if (newQuantity <= product.get('quantity_available')) {
      const updatedCartItem = await cartDataLayer.updateCartItemQuantity(buyerId, productId, newQuantity);
      return updatedCartItem;
    } else {
      return null;
    }
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

async function getCartSubtotalAndQuantity(buyerId) {
  try {
    let cartItems = await cartDataLayer.getCartItem(buyerId);
    cartItems = cartItems.toJSON();
    let subtotal = 0;
    let totalQuantity = 0;
    cartItems.forEach((cartItem) => {
      const cartItemTotalPrice = cartItem.quantity * cartItem.product.price;
      subtotal += cartItemTotalPrice;
      totalQuantity += cartItem.quantity;
    })    
    return [subtotal, totalQuantity];
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
  getCartSubtotalAndQuantity,
  clearCartItems
};