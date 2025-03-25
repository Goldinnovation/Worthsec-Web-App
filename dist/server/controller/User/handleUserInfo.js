import prisma from '../../libs/prisma.js';
import giveCurrentDateTime from '../../utils/date.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import config from '../../config/firebase.js';
import sharp from 'sharp';
initializeApp(config.firebaseConfig);
const storage = getStorage();
export async function getUserProfilePicture(req, res, next) {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(400).json({ message: "Bad Request: userId is required" });
            return;
        }
        const userImage = await prisma.picture.findFirst({
            where: {
                picture_owner_id: userId,
            },
        });
        res.status(200).json(userImage);
    }
    catch (error) {
        console.log("Server Error on getUserProfilePicture handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
;
// The function deletes the image from the picture database table through the currentUser id
export async function deleteUserProfilePicture(req, res, next) {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(400).json({ message: "Bad Request: userId is required" });
            return;
        }
        const deleleProfPic = await prisma.picture.delete({
            where: {
                picture_owner_id: req.params.id,
            },
        });
        res.status(200).json(deleleProfPic);
    }
    catch (error) {
        console.log("Server Error on deleteUserProfilePicture handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
;
// The function creates a new picture record for the currentUser inside the picture database table, only if the user does not already have a profile picture.  
// If the currentUser has a profile picture, the currentUser record will be updated to the new picture data.
export async function getUserProfileImgData(req, res) {
    try {
        const imageData = await processImageData(req, res);
        const userProfileCloudImageData = imageData ?? "Default Picture";
        const pictureData = {
            pictureUrl: req.file?.filename,
            picture_owner_id: userProfileCloudImageData,
        };
        const checksIfImageExist = await prisma.picture.findUnique({
            where: { picture_owner_id: req.user.userId },
        });
        updateOrCreateProfileImg(checksIfImageExist, pictureData, req, res);
    }
    catch (error) {
        console.log("Server Error on deleteUserProfilePicture handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
;
const updateOrCreateProfileImg = async (existPic, pictureData, req, res) => {
    try {
        if (existPic) {
            const updatePic = await prisma.picture.update({
                where: { picture_owner_id: req.user.userId },
                data: {
                    pictureUrl: pictureData.pictureUrl,
                },
            });
            res.status(200).json({ updatePic });
        }
        else {
            const createPic = await prisma.picture.create({
                data: pictureData,
            });
            console.log("new picture created");
            res.status(200).json({ createPic });
        }
    }
    catch (error) {
        console.log("Server Error on updateOrCreateProfileImg handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const processImageData = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "File could not be found" });
        }
        const file = req.file;
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `userProfileImage/${dateTime}_${file.originalname}`);
        const compromiseImage = await sharp(file.buffer)
            .resize({ width: 800, height: 1050 })
            .jpeg({ quality: 80 })
            .toBuffer();
        const compromiseImageUint8Array = new Uint8Array(compromiseImage);
        const metadata = {
            contentType: file.mimetype
        };
        const uploadaction = uploadBytesResumable(storageRef, compromiseImageUint8Array, metadata);
        const snapshot = await uploadaction;
        const downloadImageUrl = await getDownloadURL(snapshot.ref);
        return downloadImageUrl;
    }
    catch (error) {
        console.log("Server Error on processImageData handler function, CatchBlock - True:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default { createProfilePicutre: getUserProfileImgData, deleteUserProfilePicture, getUserProfilePicture };
