//File: controllers/foods.js
var mongoose = require('mongoose');
var Food  = mongoose.model('Food');

//GET - Return all foods in the DB
exports.findAllFoods = function(req, res) {
    Food.find(function(err, foods) {
    if(err) res.send(500, err.message);

    console.log('GET /foods')
        res.status(200).jsonp(foods);
    });
};