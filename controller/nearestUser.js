const History = require("../database_model/cabBooking")
const User = require("../database_model/user")
const _ = require("lodash")
const nodemailer = require("nodemailer")
const calculateDistance = require("../controller/calculateDistance")

const nearestUser = async (req, res)=>{
	try{

		const _id = req.params.id;
		// console.log(_id)
		const driver = await User.findById(_id);
		const driverLocation = driver.cabDetails.driverLocation;
		// console.log("driverLocation", driverLocation)
		// console.log("driver", driver)

		if(_.isNull(driver) || driver.isDeleted==true){
			return res.status(404).json({error: "Driver does not exist"})
		}
		if(driver.driverStatus==false){
			return res.status(400).json({error: "Driver is not active for now"})
		}
		// console.log("req.user", req.user)

		if(req.user._id!=_id && req.user.isAdmin==false){
			return res.status(401).json({error: "Unauthorised action"})
		}
 
		const allCabs = await History.find();

		const nearByCabs = allCabs.filter((cab)=>{
			const cabLocation =cab.pickUpLocation;
			const distance = calculateDistance(driverLocation.latitude, driverLocation.longitude, cabLocation.latitude, cabLocation.longitude);
			// console.log("final", distance)
			return distance<=6
		})
		// console.log(nearByCabs)
		// res.status(200).json({nearByCabs: nearByCabs})
		// console.log("nearByCabs", nearByCabs)

		if(_.isEmpty(nearByCabs)){
			return res.status(404).json({message: "No passanger in your network area"})
		}
		//send mail to driver
		const transporter = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:process.env.EMAIL,
		pass:process.env.PASSWORD
	}
})

// console.log("req.user.email", req.user.email)
const mailOptions ={
		from :'mrajneesh244@gmail.com',
		to : req.user.email,
		subject: 'User received',
		text : `There are some passangers nearby you. Details are attached below .
				${nearByCabs}`
	};
	transporter.sendMail(mailOptions, (error, info)=>{
		if(error){
			console.log("error", error)
		}
		else{
			console.log("mail Sent")
		}
	})
	return res.status(200).json({message : 'Passanger located'})



	}catch(e){
		const errorMsg = e.message;
		return res.status(404).json({error: errorMsg})
	}
}


module.exports = nearestUser;