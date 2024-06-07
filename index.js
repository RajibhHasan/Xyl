const express = require('express')
const cors = require('cors')

const socketio = require('socket.io');
const mongoose = require('mongoose')
const app=express();

const server=require("http").createServer(app);
const io = require('socket.io')(server);



const fileUpload = require('express-fileupload');
require("dotenv").config();
const port=process.env.PORT || 3000;
const uri=process.env.ATLAS_URI;
const os = require('os');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');
//import router
const userRoute = require("./Routes/userRoute.js");
const chatRouter=require("./Routes/chatRouter.js")
const messageRouter=require("./Routes/messageRoute.js");
const feddbackRouter=require("./Routes/feddbackRouter.js")


app.use(fileUpload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));





app.use(express.static('public'))

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

app.set('trust proxy', true);




app.get("/",async(req,res)=>{
	


  res.send("wellCom user")
})




app.use(userRoute);
app.use("/api/chats",chatRouter);
app.use("/api/messages/",messageRouter)
app.use("/api/feddback/",feddbackRouter)


 function run() {
	mongoose.connect(uri)
	.then(() => {
		console.log('MongoDB Connected')

	})
	.catch(err => console.error('Error connecting to MongoDB', err));

}


io.on("connection",(socket)=>{
    socket.emit("x","welcome tu")
    
    
})



server.listen(port,()=>{
	console.log(`server is runing on port:${port}`)
	
	 run();
	 
	const networkInterfaces = os.networkInterfaces();

const ipAddress = Object.values(networkInterfaces)
    .flat()
    .find(interface => !interface.internal && interface.family === 'IPv4')
    .address;

console.log('Server IP Address:', ipAddress);
	
	
	
})


