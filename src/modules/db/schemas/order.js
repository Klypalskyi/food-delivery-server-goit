const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersSchema = new Schema({
    creator: String,
    productsList: [
        {
            product: String,
            type: {type: String},
            itemsCount: Number
        }],
    deliveryType: String,
    deliveryAdress: String,
    sumToPay: Number,
    status: String
});

const Order = mongoose.model('Order', ordersSchema);
module.exports = Order;