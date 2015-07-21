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

//GET - Return a Food with specified ID
exports.findById = function(req, res) {
    Food.findById(req.params.id, function(err, food) {
    if(err) return res.send(500, err.message);

    console.log('GET /food/' + req.params.id);
        res.status(200).jsonp(food);
    });
};


//POST - Insert a new Food in the DB
exports.addFood = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var food = new Food({
        type:    			req.body.type,
        name:     			req.body.name,
        serving_size:		req.body.serving_size,
		patient_id:			req.body.patient_id,
		
		nutritional_values: { proteins: 		req.body.nutritional_values.proteins,
							  fats: 			req.body.nutritional_values.fats,
							  carbohydrates: 	req.body.nutritional_values.carbohydrates,
							  calories: 		req.body.nutritional_values.calories							  
							}
		
		//date: La inserta automaticamente a la fecha actual (ver modelo)		
    });
	//Si fueran arrays de nutritional_values...
	//food.nutritional_values.push({ proteins: req.body.nutritional_values.proteins,
	//							   fats: req.body.nutritional_values.fats, 
	//							   carbohydrates: req.body.nutritional_values.carbohydrates,
	//							   calories: req.body.nutritional_values.calories
	//							 });
	
    food.save(function(err, food) {
        if(err){ 
				 console.log('ERROR: ' + err);
				 return res.send(500, err.message);
				 }
    res.status(200).jsonp(food);
    });
};

//PUT - Update a register already exists
exports.updateFood = function(req, res) {
    Food.findById(req.params.id, function(err, food) {
        food.type =    			req.body.type;
        food.name =     		req.body.name;
        food.serving_size =		req.body.serving_size;
		food.patient_id =		req.body.patient_id;
		//date: La inserta automaticamente a la fecha actual (ver modelo)
		food.nutritional_values.proteins = req.body.nutritional_values.proteins;
		food.nutritional_values.fats = req.body.nutritional_values.fats;
		food.nutritional_values.carbohydrates = req.body.nutritional_values.carbohydrates;
		food.nutritional_values.calories = req.body.nutritional_values.calories;
		
        food.save(function(err) {
            if(err) return res.send(500, err.message);
			console.log('PUT /foods/' + req.params.id);
			//console.log('Body ' + req.body.nutritional_values.fats);
			//console.log('Fats ' + food.nutritional_values);
      res.status(200).jsonp(food);
        });
    });
};

//DELETE - Delete a Food with specified ID
exports.deleteFood = function(req, res) {
    Food.findById(req.params.id, function(err,food) {
        food.remove(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200).send('Deleted object ID: ' + req.params.id);
        })
    });
};
