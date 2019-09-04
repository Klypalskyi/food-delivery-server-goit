const Order = require('../../modules/db/schemas/order');

// const checkOrderFields = (order, res) => {
//     const prodList = order.productlist;
//     for (let el of prodList) {
//         if (el.type !== "M" || el.type !== "XL" || el.type !== "XXL") {
//             res.end("Wrong product type")
//         } else return true
//     }
// }

const createOrder = (req, res) => {
    const order = req.body;
    
        const newOrder = new Order(order);

        const sendResponse = (order) => {
            res.json({
                status: 'success',
                order: order
            });
        };

        const sendError = () => {
            res.json({
                error: 'order was not saved'
            });
        };

        newOrder.save()
            .then(sendResponse(newOrder))
            .catch(sendError)
};

module.exports = createOrder