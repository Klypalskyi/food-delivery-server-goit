module.exports = mainRouter = (req, res) => {
    res.writeHead(200, {"Content-Type": "text//html"});
    res.write("<h1>Home Page</h1>")
    res.end()
}