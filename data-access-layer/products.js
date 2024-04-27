
const { Product, Category } = require('../models'); 

async function getAllProducts() {
  const products = await Product.collection().fetch({
    withRelated: ['category']
  });
  return products;
}

async function getAllCategories() {
  const allCategories = await Category.fetchAll().map(category => [category.get("id"), category.get("name")]);
  return allCategories;
}

async function createProduct(productData) {
  // Creates an instance of the product model - represents ONE ROW in the products table
  const product = new Product();
  product.set(productData);
  // Save the newly created product to the DB
  await product.save();
  return product;
}

module.exports = {
  getAllProducts,
  getAllCategories,
  createProduct
}