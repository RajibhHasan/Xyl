const userModel = require("../Models/userModel.js");
const jwt = require('jsonwebtoken')
const validator = require('validator')
var bcrypt = require('bcryptjs');
const fs=require("fs")
const path=require("path")


const createToken=(_id)=>{
	const jwtKey=process.env.JWT_KEY;
	return jwt.sign({_id},jwtKey,{expiresIn:"3d"})
}








const userController = async (req, res) => {
    const { name, email, password } = req.body;
console.log(req.body);
    try {
        let user = await userModel.findOne({ email });
        
        

        if (user) {
            return res.status(208).json("User already exists");
        }

        if (!name || !email || !password) {
            return res.status(209).json("All fields are required...");
        }

        if (!validator.isEmail(email)) {
            return res.status(210).json("Please provide a valid email...");
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(211).json("Please provide a valid strong password...");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new userModel({ name, email, password: hashedPassword });

        await user.save();
const token=createToken(user._id)




        // You might want to return a success message or user details here
        res.status(200).json({_id:user._id,name,email,token});

    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
}





const loginUser=async(req,res)=>{
	const {email,password}=req.body;
	console.log(req.body);
	
	try {


		
		let user=await userModel.findOne({email});
	  

	                	
	if(!user) return	res.status(210).json("Please valid email ");
	
	const isValidPassword=bcrypt.compareSync(password, user.password);
	
	if(!isValidPassword)return res.status(211).json("Wrong password! ");
	const token=createToken(user._id);
	res.status(200).json({_id:user._id,name:user.name,email,token})
	
	} catch (e) {
		return res.status(404).json("Server error")
	}
	
	
	
}


const findUser=async(req,res)=>{
	const userId=req.params.userId;
	console.log(userId)
	try {
  const user=await userModel.findById(userId)
   res.status(200).json(user)
	} catch (e) {
		res.status(400).json(e)
	}
	
	
	
}





const getUser=async(req,res)=>{
	
	try {
  const users=await userModel.find();
   res.status(200).json(users)
	} catch (e) {
		res.status(400).json(e)
	}
	
	
	
}

//delete old avater?



const deleteOldAvater=async(req,res,next)=>{
	const uploadedFile = req.files.file;
	
	let filename =uploadedFile.name;
let userId = filename.slice(0, filename.lastIndexOf('.'));

let currentUser=await userModel.findById(userId)
let url=currentUser.avater;

const parts = url.split("/"); // split the URL by "/"
const extfilename = parts[parts.length - 1]; // get the last part of the URL
console.log(extfilename); // output: 664326a1e6bfd746b268c754.png
let oldPath=path.join(__dirname,'../public/avater/' + extfilename);

if(currentUser.avater){
	fs.unlink(oldPath, (err) => {
  if (err) {
    console.error('Error deleting file:', err);
    return;
  }
  console.log('File deleted successfully',filename);
});

}

next();
}








const avaterUpload=async(req,res,)=>{
	console.log(req.file)
	const uploadedFile = req.files.file;
	
	let filename =uploadedFile.name;
let userId = filename.slice(0, filename.lastIndexOf('.'));
let newAvatarUrl=`${process.env.BASE_URL}/avater/${filename}`;
userModel.findOneAndUpdate(
  { _id: userId },
  { $set: { avater: newAvatarUrl } },
  { new: true } // to return the updated document
)
.then(updatedUser => {
  console.log("User avatar updated successfully:", updatedUser);
})
.catch(error => {
  console.error("Error updating user avatar:", error);
});

let currentUser=await userModel.findById(userId)



	 res.status(200).json(currentUser)
	
}




module.exports = {userController,loginUser,findUser,getUser,avaterUpload,deleteOldAvater};
