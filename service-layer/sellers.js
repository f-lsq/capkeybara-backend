const sellerDataLayer = require('../data-access-layer/sellers')

async function getAllSellers() {
  const allSellers = await sellerDataLayer.getAllSellers();
  console.log("Service layer:", allSellers);
  return allSellers;
}

module.exports = {
  getAllSellers
}