const express = require('express')
const feddbackRouter=express.Router();
const {feddbackController,getFeddback }=require("../Controller/feddbackControler.js")






feddbackRouter.post("/",feddbackController)
feddbackRouter.get("/",getFeddback)




module.exports=feddbackRouter;