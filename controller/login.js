const User = require("../database_model/user")
const bcrypt = require("bcryptjs")
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const login = async (req, res)=>{
	try{
		if(_.isEmpty(req.body)){
			return res.send("Enter your credentials")
		}
        const email = req.body.email;
        // console.log(email);
        const password = req.body.password;
        // console.log(password);
        if(!validator.isEmail(email)){
 		return res.status(422).json({error: "Invalid Email"})
 	}
        const user = await User.findOne({email:email}); 
        // console.log(user);

        if( _.isNull(user) || user.isDeleted==true){
        	return res.status(404).json({error: "Invalid credentials"})
        }
     
        else{
        const isMatch = await bcrypt.compare(req.body.password , user.password);
        // console.log(isMatch);
        if(isMatch){
            const token = await user.generateAuthToken();
        	// console.log(token)

        	res.cookie("jwt", token, {httpOnly:true})  //store the token in cookie

            res.status(202).json({message: "user logged in successfully..."})
        }
        else{
            res.status(401).json({error: "Failed to log in. Check your credentials."});
        }
	}
        
    }catch(e){
    	const errorMsg =e.message;
        res.status(400).json({error: errorMsg})
    }
}

module.exports = login;
