const getProducts = require('./get-products');
const createProduct = require('./create-product');

const handleProductsRoute = (req, res) => {
    const method = req.method;

    if (method === "GET") {
        getProducts(req, res);
        return
    }

    if (method === "POST") {
        createProduct(req, res)
        return
    }
}

module.exports = handleProductsRoute;