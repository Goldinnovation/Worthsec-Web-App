import multer from "multer";
// const {fileURLToPath} = require('url')
import path from "path";
// const path = require('path');
import { join } from "path";
// const {join} = path


 
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

const userProfilImageFile = multer({storage:storage}).single('UserProfilImage')
console.log(userProfilImageFile)
// module.exports = userProfilImageFile


export default userProfilImageFile