const User = require("../database_model/user")
const Cab = require("../database_model/cabDetails")
const _ = require('lodash')
const jwt = require("jsonwebtoken")
const validator = require("validator")

const createUser = async(req, res)=>{
	if(_.isEmpty(req.body)){
		return res.status(204).json({error: "Fill all the fields properly"})
	}
    try{

 	if(!validator.isEmail(req.body.email)){
 		return res.status(422).json({error: "Invalid Email"})
 	}

        const{name, email, password, phone,role} = req.body;
        // console.log(user)
        // console.log(user)
        const response = await User.find({email: email})
        // console.log(response)
        if(!_.isEmpty(response)){
        	return res.status(409).json({error: "Someone is already registered with this email id"})
        }
        if((req.body.phone).toString().length!==10){
        	return res.status(400).json({error:"Invalid phone number"})
        }

        if((req.body.role==='user' || req.body.role==='admin') && req.body.cabDetails){
            return res.status(401).json({error: "cab details are not required for you "})
        }

        if(req.body.role==='driver' && !(req.body.cabDetails)){
            return res.status(404).json({error:"cab details are required"})
        }

        if(req.body.role=='driver'){
            const {licenceNumber, cabNumber,cabModel,cabColor,driverStatus,driverLocation} = req.body.cabDetails;
            if(!licenceNumber){
                return res.status(404).json({error: "Licence Number is required"})
            }
            if(!cabNumber){
                return res.status(404).json({error: "Cab Number is required"})
            }
            if(!cabModel){
                return res.status(404).json({error: "Cab model is required"})
            }
            if(!cabColor){
                return res.status(404).json({error: "Cab color is required"})
            }
            // if(!driverStatus){
            //     return res.status(404).json({error: " Driver Status is required"})
            // }
            if(!driverLocation){
                return res.status(404).json({error: "Driver location is required"})
            }
            
            
            
            // console.log(licenceNumber, !licenceNumber)
            // console.log("cabNumber",cabNumber)


            const licenceResponse = await User.findOne({"cabDetails.licenceNumber":licenceNumber})
            // console.log("licenceResponse", licenceResponse)
            if(!_.isNull(licenceResponse)){
                return res.status(401).json({error: `Someone is already registered with ${licenceNumber}`})
            }

            const cabNumberResponse = await User.findOne({"cabDetails.cabNumber":cabNumber})
            if(!_.isNull(cabNumberResponse)){
                return res.status(401).json({error: `Your cab ${cabNumber} is already registered`})
            }
                const cab = new Cab({
                email:email,
                licenceNumber:licenceNumber,
                cabNumber:cabNumber,
                cabModel:cabModel,
                cabColor:cabColor,
                driverStatus:driverStatus,
                driverLocation:driverLocation
            })

            
            await cab.save();

        }

        const user = new User({
            name:name,
            email:email,
            password:password,
            phone:phone,
            role:role
        });
        await user.save();
        
        
        
        
        return res.status(201).json({msg: "User registered successfully..."})
    }catch(e){
    	const errorMsg = e.message
     return res.status(404).json({error: errorMsg})
 	}
}


module.exports = createUser