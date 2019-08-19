const users = require('./users')

const getUser = (req, res) => {

    const id = Number(req.params.id);
    const userById = users.find(user => user.id === id)
    if (isNaN(id)) {
        res.status(403)
        res.json({
            status: "not found"
        })
    } else {
        res.status(200)
        res.json({
            status: "succsess",
            user: userById,
        })
    }
}

module.exports = getUser;