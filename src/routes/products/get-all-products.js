const products = require('./products')

const getProductRouter = (req, res) => {

    const qs = req.query;

    if (qs.category) {
        qs.category = qs.category.replace(/["]+/g, '')
    }

    if (qs.category) {
        const productByCategory = products.filter(
            product => product.categories.includes(qs.category)
        );

        if (productByCategory.length !== 0) {
            res.status(200)
            res.json({
                status: "success",
                products: productByCategory,
            })
        } else {
            res.status(403)
            res.json({
                status: "no categories",
                products: [],
            })
        }
    } else if (qs.ids) {
        const ids = qs.ids.split(",").map(id => Number(id));
        const getProductsByIds = products.filter(product =>
            ids.includes(product.id)
        );

        if (getProductsByIds.length !== 0) {
            res.status(200)
            res.json({
                status: "success",
                products: getProductsByIds,
            })
        } else {
            res.status(403)
            res.json({
                status: "no products with that ids",
                products: [],
            })
        }
    } else {
        res.status(200)
        res.json({
            status: "success",
            products: products,
        })
    }
};


module.exports = getProductRouter;
