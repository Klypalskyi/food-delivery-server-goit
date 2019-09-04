const User = require('../../modules/db/schemas/user');
const bcrypt = require('bcrypt');

const checkUserFields = (user, res) => {
    const userName = user.username;
    const userPhone = user.telephone.replace(/(\s)|([-])/g, "");
    const userPass = user.password;
    const userEmail = user.email;
    if (typeof userName === "string" &&
        !isNaN(Number(userPhone)) &&
        typeof userPass === "string" &&
        typeof userEmail === "string")
        return true
    else {
        res.status(403)
        res.json({
        status: "ERROR",
        type: "Worong type of User's query",
        params: {
            nameCheck: typeof userName === "string",
            passCheck: !isNaN(Number(userPhone)),
            phoneCheck: typeof userPass === "string",
            emailCheck: typeof userEmail === "string"
        }
    })}
}


const checkUserExist = async (user, res) => {
    const existUser = await User.find({email: user.email}, 'email');
    console.log(existUser);
    if (existUser.length > 0) {
        res.json({
            status: 'ERROR',
            type: "User is already exists!"
        })
    } else return true
}


const createUser = async (req, res) => {
    const user = req.body;
    if (await checkUserFields(user, res) && await checkUserExist(user, res)) {
        const hashPass = bcrypt.hashSync(user.password, 10);
        const phoneParse = user.telephone.replace(/(\s)|([-])/g, "")
        const userData = {
            ...user,
            telephone: phoneParse,
            password: hashPass,
            favoriteProducts: [],
            viewedProducts: [],
            orders: []
        };

        const newUser = new User(userData);

        const sendResponse = (user) => {
            res.json({
                status: 'success',
                user
            });
        };

        const sendError = () => {
            res.status(400);
            res.json({
                error: 'user was not saved'
            });
        };

        newUser.save()
            .then(sendResponse(newUser))
            .catch(sendError)
    }
};

module.exports = createUser