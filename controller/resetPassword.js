const User = require("../database_model/user")
const bcrypt = require("bcryptjs")
const validator = require("validator")

const resetPassword = async(req, res)=>{
	try{
		const _id = req.user._id;
		// console.log("_id",_id)
		// console.log("req.user._id", req.user._id)
		const userdata = await User.findById(_id);
		// console.log(userdata)
		// console.log("req.user.email", req.user.email)
		// console.log("req.body.email", req.body.email)
		// const isMatch = await bcrypt.compare(req.body.password,req.user.password)
		// console.log("isMatch", isMatch)
		// console.log("req.user._id!==_id",req.user._id!=_id) 
		// if(!validator.isEmail(req.body.email)){
 	// 	return res.status(422).json({error: "Invalid Email"})
 	// }
		if(!userdata){
			return res.status(404).json({error:"User not found"})
		}
		if(userdata.isDeleted==true){
			return res.status(404).json({error:"User does not exist"})
		}
		// if(req.user._id!=_id){
		// 	return res.status(401).json({message : "User not authorised"})
		// }
		// if(req.user.email!==req.body.email){
		// 	return res.status(401).json({error: "Unauthorised action"})
		// }
		// // console.log(bcrypt.compare(req.user.password, req.body.password))

		const isMatch = await bcrypt.compare(req.body.oldPassword,req.user.password)
		if(!isMatch){
			return res.status(401).json({error : "Old password is Invalid"})
		}

		if(req.body.oldPassword ===req.body.newPassword){
			return res.status(403).json({error: "passwords are same"})
		}

		const hashedpassword = await bcrypt.hash(req.body.newPassword, 10);
		// console.log(hashedpassword)
		const updatedUser = await User.findByIdAndUpdate(_id, {password:hashedpassword}, {new:true})
		res.status(202).json({message: "Password updated"})
	
	}catch(e){
		res.status(404).json({error: e})
	}
}

module.exports = resetPassword;