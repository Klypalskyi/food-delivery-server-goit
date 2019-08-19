const express = require('express');
const getAllProducts = require('./products/get-all-products');
const getProductById = require('./products/get-products-by');
const createProduct = require('./products/create-product');
const signUpRouter = require('./users/signUp');
const getUser = require('./users/get-user');
const createOrder = require('./orders/create-order')
const mainRoute = require('./main/main');

const router = express.Router(); 

router
    .post('/users', signUpRouter)
    .post('/products', createProduct)
    .post('/orders', createOrder)

    .get('/users/:id', getUser)
    .get('/products', getAllProducts)
    .get('/products/:id', getProductById)
    .get('', mainRoute)

    .use('*', function (req, res, next) {
        res.status(404).send('No such route')
    });


module.exports = router