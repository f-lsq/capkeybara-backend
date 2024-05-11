const bookshelf = require('../bookshelf');

// Create a new 'Product' model
const Product = bookshelf.model('Product', {
  tableName: 'products',
  // Relationship between Product and Category (One to Many)
  category: function() {
    return this.belongsTo('Category')
  },
  // Relationship between Product and Seller (One to Many)
  seller: function() {
    return this.belongsTo('Seller');
  }
})

// Create a new 'Category' model
const Category = bookshelf.model('Category', {
  tableName: 'categories',
  // Relationship between Product and Category (One to Many)
  products: function() {
    return this.hasMany('Product')
  }
})

const Buyer = bookshelf.model('Buyer', {
  tableName: 'buyers',
  orders: function() {
    return this.hasMany('Order')
  }
})

const Admin = bookshelf.model('Admin', {
  tableName: 'admins'
})

const Seller = bookshelf.model('Seller', {
  tableName: 'sellers',
  // Relationship between Product and Seller (One to Many)
  products: function() {
    return this.hasMany("Product")
  }
})

const BlacklistedToken = bookshelf.model('BlacklistedToken', {
  tableName: 'blacklisted_tokens'
})

// Relationship between Product and Buyers (Many to Many)
const CartItem = bookshelf.model('CartItem',{
  tableName: 'cart_items',
  product: function() {
    return this.belongsTo('Product');
  },
  buyer: function() {
    return this.belongsTo('Buyer')
  }
})

const Order = bookshelf.model('Order',{
  tableName: 'orders',
// Relationship between Product and Seller (One to Many)
  buyer: function() {
    return this.belongsTo('Buyer');
  },
  order_items: function() {
    return this.hasMany('OrderItem')
  }
})

// Relationship between Product and Orders (Many to Many)
const OrderItem = bookshelf.model('OrderItem',{
  tableName: 'order_items',
  order: function() {
    return this.belongsTo('Order');
  },
  product: function() {
    return this.belongsTo('Product')
  }
})


module.exports = { 
  Product, 
  Category, 
  Buyer, 
  Admin, 
  Seller,
  BlacklistedToken,
  CartItem,
  Order,
  OrderItem
 };