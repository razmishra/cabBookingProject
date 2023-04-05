const User = require("../database_model/user")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const validator = require("validator")

// const transporter = nodemailer.createTransport({
// 	service:'gmail',
// 	auth:{
// 		user:process.env.EMAIL,
// 		pass:process.env.PASSWORD
// 	}
// })

const forgetPassword = async (req, res)=>{

	const {email, newPassword} = req.body;

	// console.log(email)
	if(!email){
		return res.status(404).json({error: "Provide your email id"})
	}
	if(!newPassword){
		return res.status(404).json({error: "Enter your new password"})
	}

	if(!validator.isEmail(email)){
		return res.status(422).json({error: "Invalid email"})
	}

	const user = await User.find({email:email})
	// console.log(user)

	if(!user || user[0].isDeleted==true){
		return res.status(400).json({message:"user not found"})
	}

	const isMatch = await bcrypt.compare(newPassword, user[0].password)
	console.log(isMatch)
	if(isMatch){
		return res.status(409).json({error: "new password can not be same as old password"})
	}

	const hashedPassword =await bcrypt.hash(newPassword,10)
console.log(hashedPassword)
	const respose = await User.findOneAndUpdate({email:email}, {password: hashedPassword})
	return res.status(202).json({message: "Password has been updated"})
	//generate reset token and expiry
	// const resetToken = crypto.randomBytes(20).toString('hex');
	// const resetTokenExpiry = Date.now()+3600000; //1 hour from now

	//update user with reset token and expiry
	// user.resetPasswordToken = resetToken;
	// user.resetPasswordExpiry = resetTokenExpiry;
	// await user.save();

	//Send mail to user with reset link
	// const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
	
	// const mailOptions ={
	// 	from :'mrajneesh244@gmail.com',
	// 	to : user[0].email,
	// 	subject: 'Password Reset link',
	// 	text : `Click this link to reset your Password: ${resetUrl}`
	// };
	// transporter.sendMail(mailOptions, (error, info)=>{
	// 	if(error){
	// 		console.log("error", error)
	// 	}
	// 	else{
	// 		console.log("mail Sent")
	// 	}
	// })
	// res.status(200).json({message : 'Password reset email sent'})
}

module.exports = forgetPassword;