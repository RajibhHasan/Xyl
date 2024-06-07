const messageModel = require("../Models/messageModel.js");


//create message

const createMessage = async(req,res)=>{

const {chatId, senderId, text} = req.body;

console.log(chatId,senderId,text)
const message = new messageModel({
chatId, senderId, text
})
try {
const response = await message.save();

res.status(200).json(response);

} catch (e) {
    res.status(500).json(e)
}


}

//get message

const getMessages=async(req,res)=>{
    const {chatId}=req.params;
    
    try {
  const message=await messageModel.find({chatId});
  res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
    
}

module.exports={createMessage,getMessages}