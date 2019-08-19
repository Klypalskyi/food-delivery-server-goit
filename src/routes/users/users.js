const fs = require('fs');
const path = require('path');


const allUsersPath = path.join(
    __dirname,
    "../../db/users/all-users.json"
);
const usersFS = fs.readFileSync(allUsersPath, "utf-8");
const users = JSON.parse(usersFS);

module.exports = users