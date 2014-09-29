var nodemailer = require("nodemailer");
var smtpPool = require('nodemailer-smtp-pool');
var transporter = nodemailer.createTransport(/* smtpPool({
    host: 'localhost',
    port: 25,
    auth: {
        user: 'antoine',
        pass: 'mailpassword'
    },
    maxConnections: 5,
    maxMessages: 10
}) */);

/* var mailOptions = {
	from: "Duwab <antoine@duwab.com>", // sender address
	to: "Antoine Duwab <antoine.duwab@gmail.com>", // comma separated list of receivers
	subject: "Duwab starter", // Subject line
	text: "app starter" // plaintext body
};
transporter.sendMail(
	mailOptions,
	function(error, response){
		if(error){
			console.log('send init mail error', error);
		}else{
			console.log("Message sent: " + response.message);
		}
	}
); */

/* var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'userpass'
    }
}); */


var path           = require('path'),
	templatesDir   = path.join(__dirname, '../../views/email'),
	emailTemplates = require('email-templates');

var smtpSend = function(input){
	this.onOver = false;
	this.status = [];
	this.over = false;
	this.send(input);
};

smtpSend.prototype = {
	send : function(input){
		console.log('smtpSend');
		if(typeof input == 'object')
		{
			this.sendOne(input);
		}
	},
	sendOne : function(options){
		var myself = this,
			locals = { url: 'http://duwab.com:8900/signup', message : 'You are lame!' };
		emailTemplates(templatesDir, function(err, template) {
			template(options.template, options.locals, function(err, html, text) {
				// console.log('html, text', html, text);
				var mailOptions = {
					from: options.from || "Duwab <antoine@duwab.com>",
					// to: "Antoine Duwab <antoine.duwab@gmail.com>", // comma separated list of receivers
					to : options.to,
					subject: "Duwab starter",
					text: text,
					html: html
				};
				
				transporter.sendMail(
					mailOptions,
					function(err, res){
						myself.onMailSent(err, res, mailOptions);
					}
				);
			});
		});
	},
	onMailSent : function(err, res, mail){
		if(err){
			console.log('send init mail error', err);
		}else{
			console.log("Message sent: " + res.message);
		}
		this.over = true;
		this.status.push({
			error : err,
			response : res,
			mail : mail
		});
		this.onDone();
	},
	getStatus : function(callback){
		this.onOver = callback;
		this.onDone();
	},
	onDone : function(){
		if(this.over)
		{
			if(typeof this.onOver == 'function')
				this.onOver(this.status);
		}
	}
}

module.exports = smtpSend;






/* emailTemplates(templatesDir, function(err, template) {

	// Render a single email with one template
	var locals = { url: 'http://duwab.com:8900/signup', message : 'You are lame!' };

	template('recover', locals, function(err, html, text) {
		// console.log('html, text', html, text);
		var mailOptions = {
			from: "Duwab <antoine@duwab.com>",
			to: "Antoine Duwab <antoine.duwab@gmail.com>", // comma separated list of receivers
			subject: "Duwab starter",
			text: text,
			html: html
		};
		
		transporter.sendMail(
			mailOptions,
			function(error, response){
				if(error){
					console.log('send init mail error', error);
				}else{
					console.log("Message sent: " + response.message);
				}
			}
		);
	});

	// Render multiple emails with one template
	var locals = [
	{ pasta: 'Spaghetti' },
	{ pasta: 'Rigatoni' }
	];

	var Render = function(locals) {
	this.locals = locals;
	this.send = function(err, html, text) {
	  // ...
	};
	this.batch = function(batch) {
	  batch(this.locals, this.send);
	};
	};

	// An example users object
	var users = [
	{
	  email: 'pappa.pizza@spaghetti.com',
	  name: {
		first: 'Pappa',
		last: 'Pizza'
	  }
	},
	{
	  email: 'mister.geppetto@spaghetti.com',
	  name: {
		first: 'Mister',
		last: 'Geppetto'
	  }
	}
	];

	template('pasta-dinner', true, function(err, batch) {
	for(var user in users) {
	  var render = new Render(users[user]);
	  render.batch(batch);
	}
	});

}); */