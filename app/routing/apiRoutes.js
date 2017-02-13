// API Routes
// =============================================================

// First, load the data from friends.js
var friendsList = require('../data/friends.js');
var bodyParser = require('body-parser');
var path = require('path');


// Creating Routes
module.exports = function(app) {

    // Search for Specific Character (or all characters) - provides JSON
    app.get('/api/friends', function(req, res){
        res.status(200).json({message: 'connected.'})
        res.json(friendsList);
    });

    // Create New Characters - takes in JSON input
    app.post('/api/friends', function(req, res){
        //res.json(true);
        //console.log(req.body);
        //console.log(friendsList);

        //returned friend value
        var bestMatch = {
            'name': 'none',
            'photo': 'none'
        };

        //allows the addition of an array into a single number
        function sum (array) {
            var total = 0;
            for (var n = 0; n < array.length; n++) {
                total += parseInt(array[n]);
                //console.log(array[n]);
                //console.log(parseInt(total));
            }
            return total;
        }

        //comparative number for user's array total
        var userTotal = sum(req.body.scores);
        //confirms sum of user's array
        //console.log(userTotal);

        //set outside of loops to be mutable and resetable
        var friendTotal = 0;
        //functions to return exact match
        for (var i = 0; i < friendsList.length; i++) {
            friendTotal = sum(friendsList[i].scores);
            //console.log(friendTotal);
            if (friendTotal == userTotal) {
                bestMatch.name = friendsList[i].name;
                bestMatch.photo = friendsList[i].photo;
            }
        };

        //runs if exact match is not found
        if (bestMatch.name == 'none') {
            //highest possible amount score array can equal
            var closest = 50;
            //function to loop though array of friends and attempt to find friend sum closest to user sum
            //should only update bestMatch when a closer sum is found
            for (var i = 0; i < friendsList.length; i++) {
                friendTotal = sum(friendsList[i].scores);
                var difference = Math.abs(friendTotal - userTotal);
                if ( difference <= closest ){
                    closest = difference;
                    bestMatch.name = friendsList[i].name;
                    bestMatch.photo = friendsList[i].photo;
                };
            };
        };

        //test answer
        console.log(bestMatch);
        //send bestMatch back to webpage
        res.json(bestMatch);

    });

};