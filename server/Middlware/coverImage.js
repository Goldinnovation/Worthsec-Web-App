const multer = require('multer')
const {fileURLToPath} = require('url')
const path = require('path')
const {join} = path 


 
const upload = multer({dest: join(__dirname, "../public/CoverImageDirect")});



const storage = multer.diskStorage({

    
    destination: function(req,file,cb){
        
        cb(null, 'public')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
        // console.log(file)
    }
})




const uploadedImageFile = multer({storage:storage}).single('ImageCoverUpload')
console.log(uploadedImageFile)
module.exports = uploadedImageFile