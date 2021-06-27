const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserProfileSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
  },
  name:{
    type:String,
    required:"name is require !" 
  },
  username:{
    type:String,
    required:"username is require !",
    unique:true,
  },
  email:{
    type:String,
    required:"email is require !"
  },
  password:{
    type:String,
    required:"password is require !"
  },
  bio:{
    type:String,
  },
  link:{
    type:String
  },
  image:{
    type:String,
    default:"https://i.ibb.co/B2tYKC7/Picture-profile-icon-Male-icon-Human-or-people-sign-and-symbol-Vector-illustration.jpg"
  },
  followers:[
    {type:Schema.Types.ObjectId, ref:'User'}
  ],
  following:[
    {
      type:Schema.Types.ObjectId,ref:'User'
    }
  ]
     
})

const User = mongoose.model("User",UserProfileSchema);

module.exports = User;
