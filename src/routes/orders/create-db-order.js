const Order = require('../../modules/db/schemas/order');

const checkProdType = (list, res) => {
    console.log(list);
    for (let el of list) {
        if (el.type === "M" || el.type === "XL" || el.type === "XXL") {
            return true
        } else {
            res.status(403)
            res.json({
                status: "error",
                reason: 'Check the product type'
            });
        }
    }
}

const checkDeliveryType = (i, res) => {
    if (i === "delivery" || i === "office") {
        return true
    } else {
        res.status(403)
        res.json({
            status: "error",
            reason: 'Check the delivery type'
        });
    }
}
const checkOrderStatus = (i, res) => {
    if (i === "inProgress" || i === "declined" || i === "finished" || i === "failed") {
        return true
    } else {
        res.status(403)
        res.json({
            status: "error",
            reason: 'Check the order status'
        });
    }
}


const checkOrderFields = (order, res) => {
    const prodList = order.productsList;
    const deliveryType = order.deliveryType;
    const orderStatus = order.status;
    if (checkProdType(prodList, res) && checkDeliveryType(deliveryType, res) && checkOrderStatus(orderStatus, res)) {
        return true;
    } else false
}

const createOrder = (req, res) => {
    const order = req.body;
    if (checkOrderFields(order, res)) {
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
    }
}

module.exports = createOrder