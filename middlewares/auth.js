const jwt = require("jsonwebtoken");
const User = require("../database_model/user");

const auth = async (req, res, next)=>{
    try{
        // console.log(req.rawHeaders[1].split(' ')[1])
        const token = req.rawHeaders[1].split(' ')[1];
        // console.log(token)
        
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // const currentTime = Math.floor(Date.now()/1000);
        // console.log("verifyUser", verifyUser)
        // console.log(verifyUser);
        const user = await User.findById({_id:verifyUser._id});
        // console.log("user", user);
        req.token = token;
        req.user = user;
        next();
    }catch(e){
        if(req.path=="/logout")
        res.status(200).json({error: "You are already logged out of the system."})
        else 
        res.status(401).json({error: "Please log in to be authorised."})
        // throw new Error(e);
    }
}

module.exports = auth;