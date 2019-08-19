const fs = require('fs');
const path = require('path');
const users = require('./users')

const saveUser = user => {
    const userName = user.username;
    const userListPath = path.join(__dirname, '../../db/users/all-users.json')
    const folderName = path.join(__dirname, `../../db/users/${userName}`)
    const ordersFolder = path.join(folderName, '/orders')
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
            fs.mkdirSync(ordersFolder)
        }
    } catch (err) {
        console.error(err)
    }

    const filePath = path.join(folderName, `${userName}.json`);
    user.id = users.length + 1
    user.ordersPath = ordersFolder
    users.push(user);

    fs.writeFileSync(filePath, JSON.stringify(user), function (err) {
        if (err) throw err;
        console.log(`${userName}.json was created`);
    })

    
    fs.writeFileSync(userListPath, JSON.stringify(users), function (err) {
        if (err) throw err;
        console.log(`${userName}.json was created at list`);
    })
}

const checkUserFields = user => {
    const userName = user.username;
    const userPhone = user.telephone.replace(/\s/g, "");
    const userPass = user.password;
    const userEmail = user.email;
    if (typeof userName === "string" &&
        !isNaN(Number(userPhone)) &&
        typeof userPass === "string" &&
        typeof userEmail === "string")
        return true
    else return false
}

const checkUserExist = user => {
    const findUser = users.find(el => el.email === user.email && el.username === user.username);
    if (users.includes(findUser)) {
        return false
    } else return true
}

const signUpRouter = (req, res) => {
    let body = req.body;
    if (checkUserFields(body) && checkUserExist(body)) {
        saveUser(body);
        res.status(200);
        res.json({
            status: 'success',
            user: body
        })
    } else {
        res.status(403);
        res.json({
            status: 'error',
            reason: 'False type at query'
        })
    }
    // req
    //     .on("data", function (data) {
    //         body += data

    //     })
    //     .on("end", function () {
    //         const log = JSON.parse(body);
    //         if (checkUserFields(log)) {
    //             saveUser(log);
    //             const finRes = {
    //                 status: 'success',
    //                 user: log
    //             }

    //             res.writeHead(200, {
    //                 "Content-type": "application/json"
    //             });
    //             res.end(JSON.stringify(finRes));
    //         } else {
    //             const finRes = {
    //                 status: 'error',
    //                 reason: 'False type at query'
    //             }

    //             res.writeHead(403, {
    //                 "Content-type": "application/json"
    //             });
    //             res.end(JSON.stringify(finRes));
    //         }
    //     });
};

module.exports = signUpRouter