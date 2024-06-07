
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
	const uploadDir = path.join(__dirname, '../public/avater/');
    cb(null,uploadDir) // specify the upload directory
  },
  
  filename: function (req, file, cb) {
	
    cb(null,file.originalname) // specify the file name
  }
});

//multerconst upload = multer({ storage: storage });

const upload = multer({ storage: storage,limits: { fileSize: 1000000 } }).single('file');
module.exports=upload;





