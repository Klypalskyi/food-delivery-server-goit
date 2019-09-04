const User = require('../../modules/db/schemas/user');

const userList = (req, res) => {
    
    const sendResponse = (user) => {
        res.json({
            status: 'success',
            users: user
        });
    };

    const sendError = () => {
        res.status(400);
        res.json({
            error: 'user was not saved'
        });
    };

    User.find()
        .then(sendResponse)
        .catch(sendError)
}

module.exports = userList;