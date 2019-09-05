const Order = require('../../modules/db/schemas/order');

const getOrder = (req, res) => {
    const id = req.params.id;

    Order.findById(id, (err, result) => {
        if (err) {
            res.end(err)
        }
        res.json({
            status: "success",
            order: result
        })
    })
}

module.exports = getOrder