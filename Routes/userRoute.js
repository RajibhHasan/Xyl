const express = require('express')
const userRouter=express.Router();
const FileValidation=require("../Meddleware/fileValidation.js");




const {userController,loginUser,findUser,getUser,avaterUpload,deleteOldAvater}=require("../Controller/userController.js");


userRouter.post("/register",userController)
userRouter.post("/login",loginUser)
//userRouter.post("/upload",avaterUpload,upload)

userRouter.post('/upload',deleteOldAvater,FileValidation,avaterUpload);




userRouter.get("/user/find/:userId",findUser)

userRouter.get("/allUser",getUser)

module.exports=userRouter;