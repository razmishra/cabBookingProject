const User = require("../database_model/user")
const History = require("../database_model/cabBooking")
const _ = require("lodash")

const historyUser = async (req, res)=>{
	try{

		let {page, limit, sort} = req.query;
		page = page || 1;
		limit = limit || 10;

		let skip = (page-1)*limit
		const sortObject = {};
	    if(sort){
	        const sortFields = sort.split(',');
	        for(const field of sortFields){
	            const [key,value] = field.startsWith('-')?[field.slice(1), -1]:[field,1];
	            // console.log("key "+key+"value "+value)
	            sortObject[key] = value;
	        }
	    }

		const _id = req.params.id;
		// console.log(_id)

		if(req.user._id!=_id && req.user.isAdmin==false){
			return res.status(200).json({error: "Unauthorised action"})
		}
		
		const response = await History.find({userId:_id, isCanceled:false})
		
		const filteredResponse = await History.find({userId:_id, isCanceled:false})
										.sort(sortObject)
										.skip(skip)
										.limit(limit)
										

		// console.log(response)
		if(_.isEmpty(response)){
			return res.status(404).json({msg : "There is no booking for you"})
		}
	
		return res.status(200).json({
			count : `${response[0].name} has booked ${response.length} booking`,
			response: filteredResponse
		})

	}catch(e){
		const errorMsg = e.message
		res.status(400).json({error: errorMsg})
	}

}


module.exports = historyUser;