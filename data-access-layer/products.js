
const { Product, Category } = require('../models'); 

async function getAllProducts() {
  const products = await Product.collection().fetch({
    withRelated: ['category']
  });
  return products;
}

async function getAllCategories() {
  const allCategories = await Category.fetchAll();
  return allCategories;
}

async function getProductById(productId) {
  try {
    const existingProduct = await Product.where({
      "id": productId
    }).fetch({
      require: false
    })
  
    return existingProduct;
  } catch(e) {
    throw new Error(e);
  }
}

async function getProductBySeller(sellerId) {
  try {
    const products = await Product.where({
      "seller_id": sellerId
    }).fetchAll({
      require: false,
      withRelated: ['category']
    })
  
    return products;
  } catch(e) {
    throw new Error(e);
  }
}

async function getProductByCategory(categoryId) {
  try {
    const products = await Product.where({
      "category_id": categoryId
    }).fetchAll({
      require: false
    })
  
    return products;
  } catch(e) {
    throw new Error(e);
  }
}

async function createProduct(productData) {
  try {
    const newProduct = new Product({
      ...productData,
      date_created: new Date()
    })
    await newProduct.save();
    return newProduct;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateProduct(existingProduct, newProductData) {
  try {
    existingProduct.set({
      ...newProductData
     })

     await existingProduct.save();
     return existingProduct;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteProduct(existingProduct) {
  try {
    await existingProduct.destroy();
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllProducts,
  getAllCategories,
  getProductById,
  getProductBySeller,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct
}