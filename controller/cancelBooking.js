const User = require("../database_model/user")
const History = require("../database_model/cabBooking")
const _ = require("lodash")

const cancelBooking = async(req, res)=>{
	try{
		const _id = req.params.id;
		// console.log(_id)
		//this _id is mongoose id of booking database.

		
		// console.log(req.user)
		const response = await History.findById(_id);
		console.log(req.user._id==response.userId.toString())
		
		if(req.user._id!=response.userId.toString()){
			return res.status(401).json({error: "Unauthorised action"})
		}
		console.log(response)

		if((_.isEmpty(response)) || response.isCanceled==true){
			return res.status(404).json({error: "There is no user with this credentials"})
		}
		
		console.log(response.userId)
		await History.findByIdAndUpdate(_id , {isCanceled:true});	
		return res.status(202).json({message: "Cab cancelled. See you again! "})

		// console.log(response.userId == "6422b59dc3294b2c547d3ae2")

	}catch(err){
		const errorMsg = err.message
		res.status(400).json({error: errorMsg})
	}

}

module.exports = cancelBooking;