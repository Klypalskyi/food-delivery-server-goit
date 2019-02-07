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

const signUpRouter = (req, res) => {
    if (req.method === "POST") {
        let body = '';

        req
        .on("data", function (data) {
            body += data

        })
        .on("end", function() {
            const log = JSON.parse(body);
            saveUser(log);

            const finRes = {
                status: 'success',
                user: log
            }

            res.writeHead(200, {
                "Content-type": "application/json"
            });
            res.end(JSON.stringify(finRes));
        });
    };
};

module.exports = signUpRouter