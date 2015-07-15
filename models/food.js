var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var foodSchema = new Schema({
  type:     			{ type: String, enum:['meal', 'product']},
  name:     			{ type: String },
  nutritional_values: 	[nutritional_valuesSchema],
  date:  				{ type: Date, default: Date.now },
  serving_size:   		{ type: Number },
  patient_id:  			{ type: String }    
});

var nutritional_valuesSchema = new Schema({
  fats: 			{ type: Number },
  carbohydrates:	{ type: Number },
  proteins:			{ type: Number },
  calories:			{ type: Number }
});

module.exports = mongoose.model('food', foodSchema);