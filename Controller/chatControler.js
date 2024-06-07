const chatModel = require("../Models/chatModel.js");

// Create chat
const createChat = async (req, res) => {
const { firstId, secondId } = req.body;
console.log(firstId, secondId);

try {
const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });

if (chat) {
    console.log("already created")
return res.status(200).json(chat);
}

const newChat = new chatModel({ members: [firstId, secondId] });
const response = await newChat.save();
console.log("CreateChat:",response)
res.status(200).json(response);
} catch (e) {
console.log(e);
res.status(500).json({ error: e.message });
}
};

// Get user's chats
const findUserChats = async (req, res) => {
const { userId } = req.params; // Extracting userId properly
console.log(userId);

try {
const chats = await chatModel.find({ members: { $in: [userId] } });

        console.log('ChatList', chats);


        res.status(200).json(chats);

} catch (e) {
console.log(e);
res.status(500).json({ error: e.message });
}
};


// Find chat by user IDs
const findChat = async (req, res) => {
const { firstId, secondId } = req.params; // Extracting firstId and secondId properly
console.log(firstId, secondId);

try {
const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });
console.log(chat);
if (chat) {
res.status(200).json(chat);
} else {
res.status(404).json({ message: "Chat not found" });
}
} catch (e) {
console.log(e);
res.status(500).json({ error: e.message });
}
};

module.exports = { createChat, findUserChats, findChat };