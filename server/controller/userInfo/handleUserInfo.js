const { PrismaClient } = require("@prisma/client");
const { default: next } = require("next");
const { redirect } = require("next/dist/server/api-utils");
const prisma = new PrismaClient();


// The function queries the currentUser picture record through the userId

exports.getUserProfilePicture = async (req, res) => {
  try {
    if (req.user) {
      const userImage = await prisma.picture.findFirst({
        where: {
          picture_owner_id: req.user.userId,
        },
      });
      res.json(userImage);
    } else {
      res.status(401).json({ error: "user could not be find" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting the Imagedata");
  }
};


// The function deletes the image from the picture database table through the currentUser id

exports.deleteUserProfilePicture = async (req, res) => {
  try {
    if (req.user) {
      const deleleProfPic = await prisma.picture.delete({
        where: {
          picture_owner_id: req.params.id,
        },
      });
      res.json(deleleProfPic);
    }
  } catch (error) {
    console.log("Catch ERROR on DELETE");
    res.status(500).send("CATCH DELETE REQ ERROR");
  }
};


// The function creates a new picture record for the currentUser inside the picture database table, only if the user does not already have a profile picture.  
// If the currentUser has a profile picture, the currentUser record will be updated to the new picture data.
exports.createProfilePicutre = async (req, res, next) => {
  console.log("knock knock");

  const pictureData = {
    pictureUrl: req.file.filename,
    picture_owner_id: req.user.userId,
  };

  // console.log(pictureData.pictureUrl)
  // console.log(pictureData.picture_owner_id)

  try {
    const existPic = await prisma.picture.findUnique({
      where: { picture_owner_id: req.user.userId },
    });

    if (existPic) {
      const updatePic = await prisma.picture.update({
        where: { picture_owner_id: req.user.userId },
        data: {
          pictureUrl: pictureData.pictureUrl,
        },
      });
      console.log("updated picture");

      res.json({ updatePic });
    } else {
      const createPic = await prisma.picture.create({
        data: pictureData,
      });

      console.log("new picture created");
      res.json({ createPic });
    }
  } catch (error) {
    console.log(error);
  }
};
