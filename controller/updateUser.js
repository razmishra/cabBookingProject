const User = require("../database_model/user")
const Cab = require("../database_model/cabBooking")
const _ = require("lodash")
const updateUser = async(req, res)=>{
	try{
		// console.log(req.params.id)
		if(_.isEmpty(req.body) || _.isNull(req.body)){
			return res.status(400).json({error: "Nothing is there to update"})
		}
		const _id = req.user._id;
		// console.log(_id)
		const userData = await User.findById(_id)
		// console.log(userData)
		if(!userData || userData.isDeleted==true){
			return res.status(401).json({message:"User not found"})
		}

		if((req.body.role==='admin') || (req.body.email)){
			return res.status(401).json({error: "you can't make such changes"})
		}

		const result = await User.findByIdAndUpdate(_id, req.body, {new:true})
		return res.status(202).json({result})
		// if(!result){
		// 	return res.status(404).json({error: "No user with given Id"})
		// }
		// else{
		// 	res.status(202).json({result})
		// }

	}catch(e){
		const errorMsg = e.message
		res.status(404).json({error: errorMsg})
	}
}
module.exports = updateUser;