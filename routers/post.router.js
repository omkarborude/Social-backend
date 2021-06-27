const express = require("express");
const router = express.Router();
const {getAllPost,postNewPost,removePost,getPostById,
getPostLikes,
addPostLikes,getComments,postUserComment} = require("../controller/post.controller")

router.route("/")
.get(getAllPost)
.post(postNewPost)
.put(removePost)


router.param(":postId",getPostById)

router.route("/:postId/like")
.get(getPostLikes)
.post(addPostLikes)

router.route("/:postId/comment")
.get(getComments)
.post(postUserComment)
module.exports = router;
