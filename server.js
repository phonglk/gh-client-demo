const express = require('express');
const path = require('path');
// const https = require('https');
// const fs = require('fs');
const app = express()

// Redirect from http port 80 to https
// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// }).listen(80);

var port = process.env.PORT || 8080;

// https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// }, app).listen(port);

app.use(express.static('./dist'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
})
app.listen(port, () => console.log('Example app listening on port ' + port))