const fs = require('fs');
const path = require('path');
const users = require('../users/users');
const products = require('../products/products');
const writeFile = fs.promises.writeFile;

const createOrderFile = (order, user) => {

    const userOrdersPath = path.join(__dirname, '../../db/users/', user.username, '/orders', '/user-orders.json');
    if (fs.existsSync(userOrdersPath)) {
        const userOrdersFS = fs.readFileSync(userOrdersPath, "utf-8");
        const userOrders = JSON.parse(userOrdersFS);
        order.id = userOrders.length + 1
        userOrders.push(order)
       writeFile(userOrdersPath, JSON.stringify(userOrders, null, 4))
    } else {
        order.id = 1
        let orderArr = [order]
        writeFile(userOrdersPath, JSON.stringify(orderArr, null, 4))
    }

}

const newOrder = async (req, res) => {
    let body = req.body;
    const userId = Number(body.user);
    const userById = users.find(user => user.id === userId)
    const productsById = body.products.map(id => Number(id));
    const ProductsById = products.filter(product => productsById.includes(product.id));

    if (users.includes(userById) && ProductsById.map(el => products.includes(el))) {
        await createOrderFile(body, userById);
        res.status(200);
        res.json({
            status: "success",
            order: body
        })
    } else {
        res.status(403);
        res.json({
            status: 'failed',
            order: null
        })
    }
}

module.exports = newOrder


