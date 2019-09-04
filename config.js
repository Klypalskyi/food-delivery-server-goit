const dbUser = "Klypalskyi";
const dbPass = "JordanairJumpman23"


const config = {
    port: process.env.PORT || 3001,
    dbUser,
    dbPass,
    dbUrl: `mongodb+srv://${dbUser}:${dbPass}@first-cluster-rlvui.gcp.mongodb.net/test`
}

module.exports = config