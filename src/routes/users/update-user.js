const User = require('./../../modules/db/schemas/user')

const pushArray = (arr, arr2) => {
    let result = [];
    if (arr2) {
        for (let el of arr2) {
            arr.push(el)
        }

        for (let el of arr) {
            if (!result.includes(el)) {
                result.push(el)
            }
        }
    }

    return result;
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    if (body.favoriteProducts || body.viewedProducts || body.orders) {
        const userById = await User.findById(id, (err, result) => {
            return result;
        })

        const bodyFavProducts = body.favoriteProducts;
        const bodyViewProducts = body.viewedProducts;
        const bodyOrders = body.orders;

        const userFavProducts = userById.favoriteProducts;
        const userViewProducts = userById.viewedProducts;
        const userOrders = userById.orders;

        const newFields = {
            favoriteProducts: pushArray(userFavProducts, bodyFavProducts),
            viewedProducts: pushArray(userViewProducts, bodyViewProducts),
            orders: pushArray(userOrders, bodyOrders)
        }


        await User.findByIdAndUpdate(id, newFields, (err, result) => {
            if (err) {
                res.status(403)
                res.end(err)
            } else {
                res.status(200)
                res.json(
                    {
                        status: "success",
                        user: result
                    }
                )
            }
        })
    } else return res.json({
        status: "error",
        reason: "cant'update that field(s). Check the request body"
    })
}

module.exports = updateUser