const path = require('path');

const FileValidation=(req,res,next)=>{
	
	  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
console.log(uploadedFile)
  // Validate file type
  if (!['image/jpeg', 'image/png'].includes(uploadedFile.mimetype)) {
    return res.status(400).send('Only JPEG or PNG files are allowed.');
  }

  // Validate file size
  if (uploadedFile.size > 5 * 1024 * 1024) { // 10 MB
    return res.status(400).send('File size exceeds 2 MB.');
  }
uploadPath = path.join(__dirname,'../public/avater/' + uploadedFile.name);

  // Move the file to the desired location
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  next();
  });

}

module.exports=FileValidation;