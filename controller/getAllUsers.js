const User = require("../database_model/user")
const _ = require("lodash")

const getAllusers = async (req, res)=>{
	try{
		if(req.user.isAdmin===false ){
			return res.status(401).json({error: "You dont have permission for this operation"})
		}
		let {page, sort,role, limit, name} = req.query;
        page = page ||1;
        limit = limit||10;
        role = role || "user";
        name = name || "";
        // console.log(typeof role)
        // console.log(role)
        let skip = (page-1)*limit;

        const sortObject = {};
	    if(sort){
	        const sortFields = sort.split(',');
	        for(const field of sortFields){
	            const [key,value] = field.startsWith('-')?[field.slice(1), -1]:[field,1];
	            // console.log("key "+key+"value "+value)
	            sortObject[key] = value;
	        }
	    }
	    // console.log(sortObject)
        const result = await User.find({name:{$regex: name, $options:'$i'} ,isDeleted :false, role:role})
        							.sort(sortObject).skip(skip).limit(limit)

        res.status(200).json({result})
	}catch(e){
		const errorMsg = e.message
		res.status(404).json({error: errorMsg})
	}
}
module.exports = getAllusers 