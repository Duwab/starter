var express = require('express');
var conf = require('./conf.js');
var fs = require('fs');
var path = require('path');
var http = require('http');
// var https = require('https');
// var favicon			= require('serve-favicon');
var passport		= require("passport");
var flash			= require('connect-flash');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var session			= require('express-session');
var mysql			= require('./utils/database/module.js');

var app = express();

// var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);


// configuration ===============================================================
// connect to our database
require('./utils/session/config.js')(passport, mysql); // pass passport for configuration
app.use(express.static('./public'));
// app.use(favicon('./public/assets/img/fav.png'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: conf.EXPRESS_SECRET, 
	saveUninitialized: true,
	resave: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/app.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/testing.js')(app);

// launch ======================================================================

/* var server = app.listen(conf.PORT, function() {
    console.log('Listening on port %d', server.address().port);
}); */
var httpServer = http.createServer(app);
httpServer.listen(conf.PORT, function() {
    console.log('Listening on port %d', httpServer.address().port);
});
//httpsServer.listen(8901);