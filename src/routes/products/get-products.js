const url = require("url");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");

const getProductId = url => {
    const lastIndex = url.lastIndexOf("/");
    let id;
    let slice = url.slice(lastIndex + 1);
    if (typeof (+slice) === "number") return id = +slice;
    else return slice;
};

const getProductRouter = (req, res) => {
    const allProdPath = path.join(
        __dirname,
        "../../db/products/all-products.json"
    );

    const productsFS = fs.readFileSync(allProdPath, "utf-8");
    const products = JSON.parse(productsFS);
    const parsedUrl = url.parse(req.url);
    const id = getProductId(parsedUrl.path);
    const qs = querystring.parse(parsedUrl.query);
    qs.category = qs.category.replace(/["]+/g, '')
    
    if (qs.category) {
        const productByCategory = products.filter(
            product => product.categories[0] === qs.category
        );

        const productByCategoryJson =
            productByCategory.length !== 0
                ? JSON.stringify({
                    status: "success",
                    productByCategory: productByCategory,
                })
                : JSON.stringify({
                    status: "no categories",
                    products: [],
                });

        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.write(productByCategoryJson);
        res.end();
    } else if (qs.ids) {
        const ids = qs.ids.split(",").map(product => Number(product));
        const getProductsByIds = products.filter(product =>
            ids.includes(product.id)
        );
        const getProductsByIdsJSON =
            getProductsByIds.length !== 0
                ? JSON.stringify({
                    status: "success",
                    products: getProductsByIds,
                })
                : JSON.stringify({
                    status: "no products with that ids",
                    products: [],
                });

        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.write(getProductsByIdsJSON);
        res.end();
    } else if (!Number.isNaN(id) && typeof(id) === "number") {
        const getProductById = products.find(product => product.id === id);
        const getProductByIdJSON =
            getProductById !== undefined
                ? JSON.stringify({
                    status: "succsess",
                    product: getProductById,
                })
                : JSON.stringify({
                    status: "No product with such id",
                    products: [],
                });
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.write(getProductByIdJSON);
        res.end();
    } else {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.write(
            JSON.stringify({
                status: "success",
                products: products,
            })
        );
        res.end();
    }
};

module.exports = getProductRouter;
