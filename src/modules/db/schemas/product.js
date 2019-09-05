const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");

const productSchema = new Schema({
    sku: {
        type: String,
        default: Date.now()
    },
    name: {
        type: String,
        required: [true, "name field is required!"]
    },
    description: String,
    price: String,
    currency: {
        type: String,
        default: "UAH"
    },
    categories: {
        type: Array,
        default: ["pizza"]
    },
    likes: {
        type: Number,
        default: 0
    }

});
productSchema.plugin(timestamp);
const Product = mongoose.model('Product', productSchema);

// Product.createCollection().then(function (products) {
//     console.log('Collection is created!');
// });
module.exports = Product;