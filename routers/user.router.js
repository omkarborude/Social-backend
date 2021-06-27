const express = require("express");
const router = express.Router();
const authMiddle = require("../middlewares/authIT")
const {getAllUser,signUpUser,loginUser,getUserById,updateUserDetails,updateUserFollowers} = require("../controller/user.controller")


router.route("/getall")
.get(getAllUser)

router.route("/login")
.post(loginUser)

router.route("/signup")
.post(signUpUser)

router.use(authMiddle);

router.route("/")
.get(getUserById)
.post(updateUserDetails)
.put(updateUserFollowers)


module.exports = router;
