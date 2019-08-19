const products = require('./products')

const getProductById = (req, res) => {

    const id = Number(req.params.id);
    const productById = products.find(product => product.id === id)
    if (isNaN(id)) {
        res.status(403)
        res.json({
            status: "No product with such id",
            products: [],
        })
    } else {
        res.status(200)
        res.json({
            status: "succsess",
            product: productById,
        })
    }
}

module.exports = getProductById;