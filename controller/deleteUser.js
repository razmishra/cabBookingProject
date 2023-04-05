const User = require("../database_model/user")

const deleteUser = async(req, res)=>{
	try{
        const _id = req.params.id;
        // console.log(_id)
        const result = await User.findById(_id);
		// console.log(result)
		if(!result || result.isDeleted==true){
			return res.status(404).json({error: "User doesn't exist"})
		}

		if(	req.user.isAdmin==false && req.user._id!=_id){
			return res.status(401).json({error: "You dont have permission for this operation"})
		}
		
		else{
				if(result.role=="driver"){
					const updatedDocument =  await User.findByIdAndUpdate(_id, {isDeleted:true, driverStatus:false})
					return res.status(202).json({message: "user deleted successfully"})
				}
				else{
					const updatedDocument =  await User.findByIdAndUpdate(_id, {isDeleted:true})
					return res.status(202).json({message: "user deleted successfully"})
				}
			}

	}catch(e){
		const errorMsg = e.message;
		return res.status(404).json({error: errorMsg})
	}
}

module.exports = deleteUser;