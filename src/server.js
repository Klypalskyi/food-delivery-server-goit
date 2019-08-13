const http = require('http');
const url = require('url');
const router = require('./routes/router');
const getRouteHandler = require('./routes/get-route-handler')

const startServer = port => {
    const server = http.createServer(
        function (req, res) {

            const urlParsed = url.parse(req.url);

            const func = getRouteHandler(router, urlParsed.pathname) || router.default;

            func(req, res)
        }
    );

    server.listen(port);
};

module.exports = startServer