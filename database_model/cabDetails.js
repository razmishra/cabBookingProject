const mongoose = require("mongoose")

const cabSchema = new mongoose.Schema({
	email:{
		type:String,
		required:true
	},
	licenceNumber :{
			type:String,
			required : true
		},

		cabNumber :{
			type:String,
			required : true
		},

		cabModel:{
			type:String,
			required : true
		},

		cabColor:{
			type:String,
			required : true
		},
		driverStatus :{
			type:Boolean,
			required : true,
			default:false
		},
		driverLocation :{
			latitude :{
				type:Number,
				required:true
			},
			longitude:{
				type:Number,
				required:true
			}
		}
})

const cab =new mongoose.model("cab",cabSchema )
module.exports = cab;