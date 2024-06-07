const express = require('express')
const chatRouter=express.Router();





const {createChat,findUserChats,findChat}=require("../Controller/chatControler.js");

chatRouter.post("/create",createChat)
chatRouter.get("/findUserChats/:userId",findUserChats)
chatRouter.get("/find/:firstId/:secondId",findChat)




module.exports=chatRouter;