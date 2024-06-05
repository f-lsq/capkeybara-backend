const productDataLayer = require('../data-access-layer/products');

const validateProductData = (data) => {
  const updatableFields = [
    "name", 
    "description",
    "price", 
    "cost", 
    "quantity_available", 
    "quantity_sold",
    "image_url", 
    "category_id", 
    "seller_id"    
  ]
  const productDataFields = Object.keys(data);
  
  // check for invalid fields
  const invalidFields = productDataFields.filter((productDataField) => !updatableFields.includes(productDataField));

  if (invalidFields.length > 0) {
    throw new Error(`Invalid field name (${invalidFields.join(', ')})`);
  } 
}

async function getAllProducts(){
  try {
    const allProducts = await productDataLayer.getAllProducts()
    return allProducts;
  } catch (e) {
    throw new Error(e);
  }
  
}

async function getAllCategories(){
  try {
    const allCategories = await productDataLayer.getAllCategories()
    return allCategories;
  } catch (e) {
    throw new Error(e);
  }
  
}

async function getProductById(productId) {
  try {
    const existingProduct = await productDataLayer.getProductById(productId);
    if (existingProduct) {
      return existingProduct.toJSON();
    } else {
      return existingProduct; //null
    }
    
  } catch (e) {
    throw new Error(e);
  }
}

async function getProductBySeller(sellerId) {
  try {
    const sellerProducts = await productDataLayer.getProductBySeller(sellerId);
    if (sellerProducts) {
      return sellerProducts.toJSON();
    } else {
      return sellerProducts; //null
    }
    
  } catch (e) {
    throw new Error(e);
  }
}

async function createProduct(productData){
  try {
    const newProduct = await productDataLayer.createProduct(productData)
    return newProduct;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateProduct(productId, newProductData) {
  try {
    let existingProduct = await productDataLayer.getProductById(productId);
    if (existingProduct) {
      validateProductData(newProductData);
      const updatedProduct = await productDataLayer.updateProduct(
        existingProduct,
        {
        ...existingProduct.toJSON(),
        ...newProductData,
        date_modified: new Date()
      })
      return updatedProduct;

    } else {
      return existingProduct; //null
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteProduct(productId) {
  try {
    const existingProduct = await productDataLayer.getProductById(productId);
    if (existingProduct) {
      const deletedProduct = existingProduct.toJSON();
      await productDataLayer.deleteProduct(existingProduct);
      return deletedProduct;
    } else {
      return existingProduct //null
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function searchProducts(searchTerms) {
  try {
    const searchedProducts = await productDataLayer.searchProducts(searchTerms);
    return searchedProducts;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getAllProducts,
  getAllCategories,
  getProductById,
  getProductBySeller,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
}