import prisma from '../../libs/prisma.js';
import giveCurrentDateTime from '../../utils/date.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import config from '../../config/firebase.js';
initializeApp(config.firebaseConfig);
const storage = getStorage();
export async function uploadProfilePicture(req, res) {
    try {
        const userId = req?.decodedUserId;
        const imageBuffer = req.file?.buffer;
        const fileName = req.file?.originalname ?? "defaultName";
        const mimetype = req.file?.mimetype ?? "image/jpeg";
        if (!userId || userId === undefined || userId === " ") {
            res.status(400).json({ message: 'Invalid Request, userId is required' });
            return;
        }
        if (!imageBuffer || imageBuffer === undefined) {
            res.status(400).json({ message: 'Invalid Request, imageBuffer is required on File' });
            return;
        }
        await addImagetoCloud(imageBuffer, fileName, mimetype, userId, res);
    }
    catch (error) {
        console.error('Erron on function:uploadProfilePicture', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const addImagetoCloud = async (buffer, fileName, mimetype, userId, res) => {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `userProfileImage/${dateTime}_${fileName}`);
        const metadata = {
            contentType: mimetype,
        };
        const uploadaction = uploadBytesResumable(storageRef, buffer, metadata);
        const snapshot = await uploadaction;
        const ImageUrl = await getDownloadURL(snapshot.ref);
        if (ImageUrl) {
            await uploadImageUrlToDatabase(userId, ImageUrl, res);
        }
    }
    catch (error) {
        console.error('Erron on function: addImagetoCloud', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const uploadImageUrlToDatabase = async (userId, cloudImgUrl, res) => {
    try {
        const uploadImage = await prisma.picture.create({
            data: {
                picture_owner_id: userId,
                pictureUrl: cloudImgUrl
            }
        });
        console.log('createPic record', uploadImage);
        res.status(200).json({ message: "Image was successfully stored" });
    }
    catch (error) {
        console.error('Erron on function: uploadImageUrlToDatabase', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default uploadProfilePicture;
