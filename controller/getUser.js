const User = require("../database_model/user")

const getUser = async(req, res)=>{
	try{
	const _id = req.params.id;
	// console.log(_id)
	if(!_id){
		res.status(404).json({error: "there is no user with this email id"})
	}
	if(req.user.isAdmin===false && req.user._id != _id){
		return res.status(401).json({error: "You dont have persmission"})
	}
	const result = await User.findById(_id)
	res.status(200).json({result})
}
catch(e){
  	res.status(404).json({e})
  }
}

module.exports =getUser;