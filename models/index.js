const bookshelf = require('../bookshelf');

// Create a new 'Product' model
const Product = bookshelf.model("Product", {
  tableName: "products",
  // Relationship between Product and Category (One to Many)
  category: function() {
    return this.belongsTo("Category")
  }
})

// Create a new 'Category' model
const Category = bookshelf.model('Category', {
  tableName: 'categories',
  // Relationship between Product and Category (One to Many)
  products: function() {
    return this.hasMany("Product")
  }
})

const Buyer = bookshelf.model('Buyer', {
  tableName: 'buyers'
})

const Admin = bookshelf.model('Admin', {
  tableName: 'admins'
})

const Seller = bookshelf.model('Seller', {
  tableName: 'sellers'
})

const BlacklistedToken = bookshelf.model('BlacklistedToken', {
  tableName: 'blacklisted_tokens'
})

const CartItem = bookshelf.model('CartItem',{
  tableName: 'cart_items',
  product: function() {
    return this.belongsTo('Product');
  },
  buyer: function() {
    return this.belongsTo('Buyer')
  }
})


module.exports = { 
  Product, 
  Category, 
  Buyer, 
  Admin, 
  Seller,
  BlacklistedToken,
  CartItem
 };