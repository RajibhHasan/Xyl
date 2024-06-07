const feddbackModel=require("../Models/feddbackModel.js")
const sendEmail=require("../Meddleware/Email.js")


const feddbackController=async(req,res)=>{
    const{text,userLocation,user}=req.body;
    
    
    if(!text){
      return  res.status(400).json("Enter your text")
    }
    
    if(!userLocation || !user){
        return res.status(400).json("Something wrong")
    }
    
    
        const emailData = {
        email:user.email,
        subject: "Rajib Hasan",
        html: `    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          
          .img-box{
             display:flex;
             justify-content:center;
             align-items:center;
             overflow:hidden;
              background-image:url(${user.avater})
          }
         img{
             width:150px;
             height:150px;
             border-radius:50%;
             overflow:hidden;
             background-image:url(${user.avater})
         } 
          
          
          
          .content {
            padding: 20px;
          }
          .footer {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 10px 10px;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
          <div clsss="img-box">
          <img src="${user.avater}" alt="user" >

          </div>
            <h1>Hello ${user.name}</h1>
          </div>
          <div class="content">
            <p>Here is some information:</p>
          
           <p><strong>Name:</strong>${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${userLocation.city}</p>
            <p><strong>Region:</strong> ${userLocation.region}</p>
            
            <p><strong>Postal:</strong> ${userLocation.postal}</p>
         
          <p><strong>Timezone:</strong> ${userLocation.timezone}</p>
         <p>Here is your message:</p>
         ${text}
          </div>
          <div class="footer">
            <p>&copy; 2024 LLCR</p>
          </div>
        </div>
      </body>
    </html>

    `
    
    };

    
    
    
    
  const newChat = new feddbackModel({ text,userLocation,user });
const response = await newChat.save();

    sendEmail(req,res,emailData);
    res.status(200).json("Successfully sended");


    
    
    
    

  
    
    
    
}

const getFeddback=async(req,res)=>{
    
  const response= await feddbackModel.find();
  
 res.status(200).json(response)
    
    
}





module.exports={feddbackController,getFeddback}