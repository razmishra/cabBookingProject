const History = require("../database_model/cabBooking")
const _ = require("lodash")
const User = require("../database_model/user")
const validator = require("validator")
const calculateDistance = require("../controller/calculateDistance")

const createBooking = async (req, res)=>{
	// console.log("in the createBooking api")
	try{
		if(_.isEmpty(req.body)){
		res.status(404).json({error: "Provide your details"})
	}

		if(!validator.isEmail(req.body.email)){
 		return res.status(422).json({error: "Invalid Email"})
 	}
 	if((req.body.phone).toString().length!==10){
        	return res.status(400).json({error:"Invalid phone number"})
        }
		// var urlOfPickUpLocation = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + req.body.pickUpLocation;
		// var urlOfDestination = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + req.body.destination;
		// const response = await fetch(urlOfDestination);
		// const data = await response.json();
		// console.log("data", data)
		// console.log(data[0].lat);	
		// res.send(data[0].lat) 
		// console.log(req.user.email)
		// console.log(req.body.email)
		// const center = {type:"point",coordinates :[-112.4194,37.7749]};
		// const radius = 1000
		// History.find({
		// 	pickUpLocation:{
		// 		$nearSphere:{
		// 			$geometry: center,
		// 			$maxDistance:radius
		// 		}
		// 	}
		// }).then(users=>console.log(users))
		// .catch(e=>console.log(e))

		if(req.user.email!=req.body.email){
			return res.status(401).json({error: "Unauthorised action"})
		}


		else{
			const _id = req.user._id;

			const newBooking =  new History({
				userId:_id,
				...req.body
				});

		
		const pickUpLat = req.body.pickUpLocation.latitude;
		const pickUpLon = req.body.pickUpLocation.longitude
		const desLat = req.body.destination.latitude
		const desLon = req.body.destination.longitude

		const distance = calculateDistance(pickUpLat, pickUpLon, desLat, desLon)
		// console.log("distance", distance)
		if(distance==0){
			return res.status(400).json({error: "Pick-up-location and destination should not be same"})
		}

		await newBooking.save();
		return res.status(201).json({
			message: `We have received your booking request.You have booked ride for ${distance}km. we are finding a driver for you, have patience`
		})
		}
		

		// if(req.body.email !== req.user.email){
		// 	res.status(401).json({error: "log in into your account"})
		// }
		// const user = await User.findOne({email: req.user.email})
		// // console.log(user)
		
		
	}catch(e){
		// console.log("in error section")
		const errorMsg = e.message;
		res.status(404).json({error: errorMsg})
	}
}

module.exports = createBooking;
