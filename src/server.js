const http = require('http');
const url = require('url');

const morgan = require('morgan')
const router = require('./routes/router');

const logger = morgan('combined');

const startServer = port => {
    const server = http.createServer(function(req, res) {

        const urlParsed = url.parse(req.url);

        const func = router[urlParsed.pathname] || router.default;

        logger(req, res, () => func(req, res));
    });

    server.listen(port);
};

module.exports = startServer