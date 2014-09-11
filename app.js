var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

//var credentials = {key: privateKey, cert: certificate};
var credentials = {key: "", cert: ""};
var express = require('express');
var app = express();

// your express configuration here

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

var server = httpServer.listen(8900, function() {
    console.log('Listening on port %d', server.address().port);
});
//httpsServer.listen(8901);