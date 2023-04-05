const mongoose = require("mongoose")

//create a schema

const paymentSchema  = new mongoose.Schema({
	paymentId:{
		type:String
	},
	amount:{
		type:Number,
		// required:true
	},
	currency:String,
	status:{
		type:String,
		default:"Pending"
	}
})

//create a model
const payment = new mongoose.model("payment", paymentSchema)

module.exports = payment;