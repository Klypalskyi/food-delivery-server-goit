const express = require('express');
const router = express.Router();
//POST
const signUpRouter = require('./users/signUp');
const createOrder = require('./orders/create-order');
const preSaveImage = require('./images/pre-save')
const saveImage = require('./images/save-image');
//GET
const getUser = require('./users/get-user');
const getAllProducts = require('./products/get-all-products');
const getProductById = require('./products/get-products-by');
//DEFAULT
const mainRoute = require('./main/main');

router
    .post('/users', signUpRouter)
    .post('/orders', createOrder)
    .post('/images', preSaveImage.single('file'), saveImage)

    .get('/users/:id', getUser)
    .get('/products', getAllProducts)
    .get('/products/:id', getProductById)
    .get('', mainRoute)

    .use('*', function (req, res, next) {
        res.status(404).send('No such route')
    });

module.exports = router