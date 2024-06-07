const express = require('express')
const messageRouter=express.Router();





const {createMessage,getMessages}=require("../Controller/messageControler.js");

messageRouter.post("/createmessage",createMessage);
messageRouter.get("/getMessages/:chatId",getMessages)




module.exports=messageRouter;