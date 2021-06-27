const Post = require("../models/post.model");

const getAllPost = async (req,res) =>  {
  try{
      let posts = await Post.find({});
      posts = posts.filter((post) => post.active);
      res.status(200).json({success:true,posts})
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}



const postNewPost = async (req,res) => {
  try{
   const {user} = req;
   const {description,media}  = req.body;
   const date = Date.now();
   console.log(Date())
   let newPost = new Post({description:description,media:media});
   newPost.userId = user._id;
   newPost.active = true;
   newPost = await newPost.save()
   res.status(200).json({success:true,newPost})
  }catch(error){
    conosle.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

// removePost by Boolean active = false 
const removePost = async (req,res) => {
  try{
       
       const {postId} = req.body;
       let post = await Post.findOne({postId})

       post.active = false;
       post = await post.save();
       res.status(200).json({success:true,post})   

  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

// getPostById for Params 
const getPostById = async (req,res,next,postId) => {
  try{
 
    let post = await Post.findOne({_id:postId})
    if(!post) {
      res.json({success:false,message:"unable find Post"})
    }
    req.post = post;
    next();
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}


// get all likes 

const getPostLikes = async (req,res) => {
  try{
   const {post} = req;
   let user = await post.populate({path:"likes",select:"username"}).execPopulate();
   res.status(200).json({success:true,users:user.likes})
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

const addPostLikes = async (req,res) => {
  try{
    // post by param in router & user by auth. middle 
    // revise Middle Auth. 
    let {post,user} = req;
    console.log(post)
     console.log(user)
    if(post.likes.includes(user._id)) {
      post.likes = post.likes.filter((like) => like != user._id)
    } else {
      post.likes.push(user._id)
    } 
    post = await post.save();

    res.status(200).json({success:true,post})
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}


// for getComments
const getComments = async (req,res) => {
  try{
const {post} = req;
let user = await post.populate({path:"comments.userId",select:"username"}).execPopulate()
user.comments = user.comments.filter((comment) => comment.active)
res.status(200).json({success:true,comments:user.comments})
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
}

const postUserComment = async (req,res) => {
  try{

    let {post, user} = req;
    let newComment  = req.body;
    newComment.userId = user._id;
    newComment.active = true;
    post.comments.push(newComment)
    post = await post.save();
    post = await post.populate({path:"comments.userId",select:"username"}).execPopulate();
    res.status(200).json({success:true,comments:post.comments})
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }

}
module.exports = {
  getAllPost,
  postNewPost,
  removePost,
  getPostById,
  getPostLikes,
  addPostLikes,
  getComments,
  postUserComment,
}