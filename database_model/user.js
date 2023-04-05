const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const _ = require("lodash")
const {isNullOrUndefined} = require('util')

//create a schema
const userSchema = new mongoose.Schema({
	name:{
		type: String, 
		required:true
	},

	email:{
		type: String, 
		required:true,
		unique :[true , "Someone is already registered with this email"],
	},

	password: {
		type: String, 
		required: true
	},

	phone : {
		type: Number,
		required:true
	},

	role : {
		type: String, 
		default : "user",
		enum : ['admin','driver','user']
	},
	
	// cabDetails:{
	// 	licenceNumber :{
	// 		type:String,
	// 		required : function(){ return this.role==="driver"}
	// 	},

	// 	cabNumber :{
	// 		type:String,
	// 		required : function(){ return this.role==="driver"}
	// 	},

	// 	cabModel:{
	// 		type:String,
	// 		required : function(){ return this.role==="driver"}
	// 	},

	// 	cabColor:{
	// 		type:String,
	// 		required : function(){ return this.role==="driver"}
	// 	},
	// 	driverStatus :{
	// 		type:Boolean,
	// 		required : function(){ return this.role==="driver"},
	// 		// default:false
	// 	},
	// 	driverLocation :{
	// 		latitude :{
	// 			type:Number,
	// 			required:function(){ return this.role==="driver"}
	// 		},
	// 		longitude:{
	// 			type:Number,
	// 			required:function(){ return this.role==="driver"}
	// 		}
	// 	}
	// },

	isAdmin :{
		type: Boolean ,
	 	default: function(){ return this.role==="admin"}
	 },
	isDeleted : {type:Boolean, default :false}
})

// userSchema.pre('save', function(next){
// 	if(this.role==='user' && Object.keys(this.cabDetails.driverLocation)>0){

// 	}
// })

// userSchema.pre('save', function(next) {
// 	console.log("1",this.cabDetails.driverLocation)
// 	console.log("2",!isNullOrUndefined(this.cabDetails))
//   	console.log("3",this.cabDetails)
//   	console.log("4",!(this.cabDetails.driverLocation))
//   	console.log("5",_.isEmpty(this.cabDetails.driverLocation))
//   	console.log("6",Object.values(this.cabDetails.driverLocation))
//   	console.log("7",Object.keys(this.cabDetails.driverLocation).length)

//   if (this.role === 'user' && Object.keys(this.cabDetails.driverLocation).length > 0) {
  	
//     const err = new Error('Cab details should not be provided for users.');
//     return next(err);
//   } else if (this.role === 'driver' && (isNullOrUndefined(this.cabDetails) || Object.keys(this.cabDetails).length === 0)) {
//     const err = new Error('Cab details are required for drivers.');
//     return next(err);
//   } else if (this.role === 'driver' && !isNullOrUndefined(this.cabDetails) && Object.keys(this.cabDetails).length > 0 && (isNullOrUndefined(this.cabDetails.driver_address) || Object.keys(this.cabDetails.driver_address).length === 0)) {
//     const err = new Error('Driver address is required for drivers.');
//     return next(err);
//   }
//   next();
// });

// userSchema.path('licenceNumber').validate(function(value){
// 	if(this.role==='user' && value){
// 		throw new Error ('licence Number is not required in your case')
// 	}
// })
// userSchema.path('cabNumber').validate(function(value){
// 	if(this.role==='user' && value){
// 		throw new Error ('cab Number is not required in your case')
// 	}
// })

//generate jwt token
userSchema.methods.generateAuthToken = async function(next){
    try{
        const user=this;
        // console.log(user)
        const token = jwt.sign({_id:user.id.toString()},process.env.SECRET_KEY, {expiresIn:'10000s'});
        // user.tokens = user.tokens.concat({token});
        // await user.save();
        return token;
        // console.log(token)
    }catch(err){
        throw new Error("Error while generating token")
    }
    }


//hash the password
userSchema.pre('save', async function(next){
	if(this.isModified('password')){
		this.password =await bcrypt.hash(this.password, 10)
	}
	next();
})

//create a collection
const user =new mongoose.model("user",userSchema )
module.exports = user;