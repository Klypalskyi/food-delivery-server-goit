const fs = require('fs');
const path = require('path');


const allProdPath = path.join(
    __dirname,
    "../../db/products/all-products.json"
);
const productsFS = fs.readFileSync(allProdPath, "utf-8");
const products = JSON.parse(productsFS);

module.exports = products