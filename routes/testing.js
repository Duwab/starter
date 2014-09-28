module.exports = function(app){
	app.get('/testing', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('templates/template.ejs', { user: req.user, message : req.flash('loginMessage') });
	});
}