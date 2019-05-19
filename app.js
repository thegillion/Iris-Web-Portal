const express = require('express')
var fs = require('fs')
var https = require('https')
var proxy = require('http-proxy-middleware');

const app = express()
const port = 3000

app.use(express.static('src'))

const overrideOrigin = 'https://dev.arcus.wl-net.net'
var options = {
    target: 'https://client.dev.arcus.wl-net.net', // target host
    changeOrigin: true, // NOTE: UI runs on a different origin, so we change this in onProxyReqWs.
    ws: true, // proxy websockets
    pathRewrite: {
        '^/debug.html': '/index.html', // allow actual server to be reached.
    },
    logLevel: 'debug',
};

options.onProxyRes = function onProxyRes(proxyRes, req, res) {
    // console.log(proxyRes);
}
options.onProxyReqWs = function onProxyReqWs(proxyReq, req, socket, options, head) {
    proxyReq.setHeader('Origin', overrideOrigin);
}

var websocketProxy = proxy(options);
app.use('/websocket', websocketProxy);
app.use('/login', websocketProxy);
app.use('/debug.html', websocketProxy);

server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)

server.listen(port, () => console.log(`app listening on port ${port}!`))