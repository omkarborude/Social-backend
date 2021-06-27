const User = require("../models/user.model");
const { extend } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mySecret = process.env['jwt-secret']

const getAllUser = async (req,res) => {
   try{
     let user = await User.find({});
     user = user.map((user)=> {
       user.password = undefined;
       return user;
     })
     res.status(200).json({success:true,user})
   }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

const loginUser = async (req,res) => {
  try{
      const {username , password} = req.body;
      let user = await User.findOne({username});
      
      if(user) {
        if(bcrypt.compareSync(password,user.password)) {
        const token = jwt.sign({_id:user._id,name:user.name,username:user.username,email:user.email},
        mySecret,{expiresIn:"24h"}
        )
        res.json({ success: true, token });
       } else {res.status(401).json({success: false,message:     "Username and password not match !"})} 
      } else {
        res.status(400).json({success:false,message:"username is incorrect !"})
      }

  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

const signUpUser = async (req,res) => {
   try{
      let newUserData = req.body;
      const usernameAlreadyTaken = await User.exists({username:newUserData.username})
      if(usernameAlreadyTaken){
              res.status(400).json({ success: false, message: "Username already taken" });
        }
        newUserData.password = bcrypt.hashSync(newUserData.password,10);
        let newUserDB = new User(newUserData);
        newUserDB = await newUserDB.save()

       await res.status(200).json({ success: true, message: "Successfully signUp !" });
    }catch(error){
      console.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

// after middle
const getUserById = async (req,res) => {
  let {user} = req;
  user = await User.findOne({_id:user._id})
  user.password = undefined;
  res.status(200).json({success:true,user})
}

// uodate user details
const updateUserDetails = async (req,res) => {
  try{
  let {user} = req;
  user = await User.findOne({_id: user._id});
  const updateData = req.body;
 
  user = extend(user,updateData)
   await user.save();
  user.password = undefined;
  res.status(200).json({success:true,user})
  }catch(error){
        console.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

// update user followers 
const updateUserFollowers = async (req,res) => {
  try {

      let  {user}   = req;
      const uId = user._id
      const {visiterUserId} = req.body;
      user = await User.findOne({_id:user._id})
      let visitUser = await User.findOne({_id:visiterUserId})  
    if(
      user.following.includes(visiterUserId) ||
      visitUser.followers.includes(user._id) 
      ) {
        console.log("101,ok")
        // then remove it
      user.following = user.following.filter((user) => user._id.toString() !== visiterUserId.toString())

      visitUser.followers = visitUser.followers.filter((vuser)=>vuser._id.toString().toString() !== user._id.toString()) 
    } else {
      user.following.push(visiterUserId)
      visitUser.followers.push(user._id)
      
    }

    await user.save();
    await visitUser.save();
         console.log(user)
    res.status(200).json({success:true,user,visitUser})     
  }catch(error){
    console.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

module.exports = {
  getAllUser,
  signUpUser,
  loginUser,
  getUserById,
  updateUserDetails,
  updateUserFollowers,
};
