const handleProductsRoute = require('./products/handle-products')
const signUpRouter = require('./users/signUp')
const mainRoute = require('./main/main')
debugger
const router = {
    '/signup': signUpRouter,
    '/products': handleProductsRoute,
    '/products/': handleProductsRoute,
    '/': mainRoute,
    default: mainRoute
}

module.exports = router