const app = require('./modules/app')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./routes/router');
const cors = require('cors');

const errorHandler = (req, res, next) => {
    res.status(400).send('No such page');
    next();
};

const startServer = port => {
    
    app
        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())
        .use(cors())
        .use(morgan('dev'))
        .use(router)
        .use(errorHandler)
     
    app.listen(port);

    console.log('Server is on ' + port);
};

module.exports = startServer;


// const https = require('https');
// const url = require('url');
// const fs = require('fs');
// const path = require('path');
// const getRouteHandler = require('./routes/get-route-handler')

// const logger = morgan('combined');

// const keyPath = path.join(__dirname, "sert/key-20190213-131624.pem");
// const certPath = path.join(__dirname, "sert/cert-20190213-131624.crt")

// const optionsSSL = {
//     cert: fs.readFileSync(certPath),
//     key: fs.readFileSync(keyPath)
// }

// const startServer = port => {
//     const server = https.createServer(optionsSSL, function (req, res) {

//         const urlParsed = url.parse(req.url);

//         const func = getRouteHandler(router, urlParsed.pathname) || router.default;

//         logger(req, res, () => func(req, res));
//     });

//     server.listen(port);
// };

// module.exports = startServer