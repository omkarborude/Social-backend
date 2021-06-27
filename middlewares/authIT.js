const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mySecret = process.env['jwt-secret']


// do it later


const authMiddle = async (req,res,next) => {
  try{

    let token = req.headers.authorization;
    if(!token) {
      res.status(400).json({success:false,errorMsg:"token is not there !"})
    }
    token = token.split(" ")[1];
    const decodeToken = jwt.verify(token,mySecret)
    const user  = await User.findOne({_id:decodeToken._id})
    console.log(decodeToken._id)
    if(!user) {
      res.status(400).json({success:false,message:"user not avialable"})
    }
    req.user = {_id: decodeToken._id, name: decodeToken.name}
    next();

  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}



module.exports = authMiddle;