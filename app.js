var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

//MONGOOSE MODELS

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/diet', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

var models = require('./models/food')(app, mongoose);

//ROUTES

var FoodCtrl = require('./controllers/foods');

// API routes

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

router.route('/foods')
  .get(FoodCtrl.findAllFoods)
  // (accessed at POST http://localhost:3000/api/foods)
  .post(FoodCtrl.addFood);

router.route('/foods/:id')
  .get(FoodCtrl.findById)
  .put(FoodCtrl.updateFood)
  .delete(FoodCtrl.deleteFood);

// all of our routes will be prefixed with /api
app.use('/api', router);