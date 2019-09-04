const startServer = require('./src/server');
const connectToDB = require('./src/modules/db/connect-db');
const {port, dbUrl} = require('./config');

startServer(port);
connectToDB(dbUrl)