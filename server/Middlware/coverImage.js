const multer = require('multer')
// const {fileURLToPath} = require('url')



// setting the multer configurationn to handle file upload 
const storage = multer.memoryStorage()
const upload = multer({storage}).single('ImageCoverUpload')







// const uploadedImageFile = multer({storage:storage}).single('ImageCoverUpload')
// // console.log(uploadedImageFile)
module.exports = upload;

 