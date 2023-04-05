const User = require("../database_model/user")
const _ = require("lodash")

const restoreAccount = async(req, res)=>{
	try{
		
		const {email, password} = req.body;

		const userResponse = await User.findOne({email:email});

		if(_.isNull(userResponse)){
			return res.status(401).json({error:" You have not registered before."})
		}

		if(userResponse.isDeleted==false){
			return res.status(401).json({error:"Your acount is active"})
		}
		userResponse.isDeleted=false;
		userResponse.save();
		return res.status(202).json({message: "Your account has been restored"})
	}catch(e){
		const errorMsg = e.message
		return res.status(404).json({error:errorMsg})
	}
}

module.exports = restoreAccount