const https = require('https');
const url = require('url');
const fs = require('fs');
const morgan = require('morgan')
const path = require('path');
const router = require('./routes/router');

const logger = morgan('combined');

const keyPath = path.join(__dirname, "sert/key-20190213-131624.pem");
const certPath = path.join(__dirname, "sert/cert-20190213-131624.crt")

const optionsSSL = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
}

const unHashUrl = url => {
    const lastIndex = url.lastIndexOf('/');
    if (lastIndex === 0) {
        return url;
    }

    if (lastIndex !== -1) {
        return url.slice(0, lastIndex)
    }
}

const startServer = port => {
    const server = https.createServer(optionsSSL, function (req, res) {

        const urlParsed = url.parse(req.url);

        unHashUrl(urlParsed);

        const func = router[urlParsed.pathname] || router.default

        logger(req, res, () => func(req, res));
    });

    server.listen(port);
};

module.exports = startServer