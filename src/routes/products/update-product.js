const Product = require('../../modules/db/schemas/product');


const updateProduct = (req, res) => {
    const id = req.params.id;
    const body = req.body

    Product.findByIdAndUpdate(id, body, (err, result) => {
        if (err) {
            res.end(err)
        }
        if (result) {
            res.json({
                status: "success",
                updatedProduct: result
            })
        }
    })
}

module.exports = updateProduct