const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const saveUser = user => {
    const userName = user.username;
    const filePath = path.join(__dirname, "../../db/users", `${userName}.json`);

    fs.writeFile(filePath, JSON.stringify(user), function (err) {
        if (err) throw err;
        console.log(`${userName}.json was created`);
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
    // console.log(typeof userName === "string");
    // console.log(!isNaN(Number(userPhone)));
    // console.log(typeof userPass === "string");
    // console.log(typeof userEmail === "string");
}

const signUpRouter = (req, res) => {
    if (req.method === "POST") {
        let body = '';
        req
            .on("data", function (data) {
                body += data

            })
            .on("end", function () {
                const log = JSON.parse(body);
                if (checkUserFields(log)) {
                    saveUser(log);
                    const finRes = {
                        status: 'success',
                        user: log
                    }

                    res.writeHead(200, {
                        "Content-type": "application/json"
                    });
                    res.end(JSON.stringify(finRes));
                } else {
                    const finRes = {
                        status: 'error',
                        reason: 'False type at query'
                    }

                    res.writeHead(403, {
                        "Content-type": "application/json"
                    });
                    res.end(JSON.stringify(finRes));
                }


            });
    };
};

module.exports = signUpRouter