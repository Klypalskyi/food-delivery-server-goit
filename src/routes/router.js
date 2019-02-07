const productsRoute = require('./products/products');
const signUpRouter = require('./users/signUp');
const mainRoute = require('./main/main');

const router = {
    '/products': productsRoute,
    '/signup': signUpRouter,
    '/': mainRoute,
    default: mainRoute
};

module.exports = router