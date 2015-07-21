var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var foodSchema = new Schema({
  type:     			{ type: String, enum:['meal', 'product']},
  name:     			{ type: String },
  nutritional_values: 	{ 
						fats: 			{ type: Number },
						carbohydrates:	{ type: Number },
						proteins:		{ type: Number },
						calories:		{ type: Number }
						},
  date:  				{ type: Date, default: Date.now },
  serving_size:   		{ type: Number },
  patient_id:  			{ type: String }    
});

module.exports = mongoose.model('Food', foodSchema);