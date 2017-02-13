//app requires path moduleto 
var path = require('path');

// HTML Routes
// =============================================================

module.exports = function(app){

	app.get('/', function(req, res){
		//res.send("You are here |-->*<--|")
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

	app.get('/survey', function(req, res){
		//res.send("What kind of a monkey delivers surveys?")
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

}