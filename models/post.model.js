const mongoose = require("mongoose");
const {Schema} = mongoose;

const commentSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  comment:{
    type:String,
    required:"Comment content is require !"
  },
  time:{
     type: Date, 
     default: Date.now
  },
  active:Boolean
});

const postSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  description:{
    type:String,
    required:"description should be filled !"
  },
  date:{
     type:String, 
    
  },
  media: {
			type: String,
			default: '',
	},
  likes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  comments:[commentSchema],
  active:Boolean
}
)


const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
