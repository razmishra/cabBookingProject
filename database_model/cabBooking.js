const mongoose = require("mongoose")
const validator = require("validator")
//create a schema

const cabBookingSchema = new mongoose.Schema({
	userId :{
		type:mongoose.Schema.ObjectId,
		required : true
	},
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	}, 
	phone:{
		type:Number,
		required:true
	},
	pickUpLocation:{
		latitude :{
			type:Number,
			required:true
		},
		longitude:{
			type:Number,
			required:true
		}
	},
	destination:{
		latitude :{
			type:Number,
			required:true
		},
		longitude:{
			type:Number,
			required:true
		}
	},
	bookingStatus:{
		type:String,
		default:"Pending",
		required:true
	},
	isCanceled:{
		type:Boolean, 
		required:true, 
		default:false
	}
})

//create a model
const history = new mongoose.model("history", cabBookingSchema);

module.exports = history;