//Package Requirements
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//express config.
var app = express();
var PORT = 3000;

//BodyParser useage to easily interpret data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static('app/public'));

//routing 
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

//Checks to see if the port is working on 3000.
app.listen(PORT, function(){
	console.log('Listening on port '+ PORT);
});