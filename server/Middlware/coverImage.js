const multer = require('multer')
const {fileURLToPath} = require('url')
const path = require('path')
const {join} = path 
const sharp = require('sharp')






const storage = multer.diskStorage({

    
    destination: function(req,file,cb){
        
        cb(null, 'public')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
        // console.log(file)
    }
})
function converImageType(req,res,next){
    if(!req.file){
        return next();
    }

    const imagePath = join(__dirname, '../public',req.file.originalname)
    sharp(imagePath)
    .webp()
    .toFile(join(__dirname, '../public', `${req.file.originalname}.webp`), (err, info) => {
        if(err){
            return res.status(500).send('Error converting image to Webp')
    
        }
    
        req.webpImagePath = `${req.file.originalname}.webp`;
        // console.log(req.webpImagePath)
        
        next();

    })
   


}




const uploadedImageFile = multer({storage:storage}).single('ImageCoverUpload')
console.log(uploadedImageFile)
module.exports = (converImageType,uploadedImageFile)