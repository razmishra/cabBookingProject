const User = require("../database_model/user")
const History = require("../database_model/cabBooking")
const _ =require("lodash")

const updateBooking = async (req, res)=>{
	try{
		if(_.isEmpty(req.body)){
			return res.status(400).json({error: "provide some details for updation"})
		}
		const _id = req.params.id;
		// console.log(_id)
		//this _id is mongoose id of users database.

		if(req.user._id!=_id && req.user.isAdmin==false){
			return res.status(401).json({error: "Unauthorised action"})
		}
		// console.log(req.user)
		const response = await History.findById(_id);
		// console.log(response)
		
		if((_.isEmpty(response)) || response.isCanceled==true){
			return res.status(404).json({error: "There is no user with this credentials"})
		}
		else{
			await History.findByIdAndUpdate(_id , req.body);	
			return res.status(202).json({message: "Details has beed updated! "})
		}

	}catch(err){
		const errorMsg = err.message
		return res.status(400).json({error: errorMsg})
	}
}

module.exports = updateBooking;