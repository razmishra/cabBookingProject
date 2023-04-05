const User = require("../database_model/user")
const Payment = require("../database_model/payment")
const Cab = require("../database_model/cabBooking")
const _ = require("lodash")

const getReceipt = async (req, res)=>{
	try{
		const _id = req.params.id;
		const response = Payment.findById(_id)
		if(_.isEmpty(response)){
			res.send("You have not made any payment")
		}
		res.json({
			paid_by : _id,
			amount : response.amount,
			status : "Success"
		})
	}catch(e){
		res.send(e)
	}
}

module.exports = getReceipt;