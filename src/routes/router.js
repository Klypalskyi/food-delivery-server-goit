const express = require('express');
const router = express.Router();
//POST
// const signUpRouter = require('./users/signUp');
const createUserDb = require('./users/create-db-user')
// const createOrder = require('./orders/create-order');
const createOrderDb = require('./orders/create-db-order');
const preSaveImage = require('./images/pre-save')
const saveImage = require('./images/save-image');
const createProduct = require('./products/create-product')
//PUT
const updateUser = require('./users/update-user')
const updateProduct = require('./products/update-product')
//GET
const getUser = require('./users/get-user');
const getUserListDb = require('./users/get-all-users-db');
const getOrderById = require('./orders/get-order')
const getAllProducts = require('./products/get-all-products');
const getProductById = require('./products/get-products-by');
//DEFAULT
const mainRoute = require('./main/main');

router
    .post('/users', createUserDb)
    .post('/orders', createOrderDb)
    .post('/images', preSaveImage.single('file'), saveImage)
    .post('/products', createProduct)

    .put('/users/:id', updateUser)
    .put('/products/:id', updateProduct)

    .get('/users', getUserListDb)
    .get('/users/:id', getUser)
    .get('/orders/:id', getOrderById)
    .get('/products', getAllProducts)
    .get('/products/:id', getProductById)
    .get('', mainRoute)

    .use('*', function (req, res, next) {
        res.status(404).send('No such route')
    });

module.exports = router