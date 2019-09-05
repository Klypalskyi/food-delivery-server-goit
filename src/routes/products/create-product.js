const Product = require('../../modules/db/schemas/product')

const createProduct = (req, res) => {
    const product = req.body;

    const newProduct = new Product({product});

    const sendResponse = (product) => {
        res.json({
            status: 'success',
            product: product
        });
    };

    const sendError = () => {
        res.json({
            error: 'product was not saved'
        });
    };

    newProduct.save()
        .then(sendResponse(newProduct))
        .catch(sendError)
}

module.exports = createProduct;