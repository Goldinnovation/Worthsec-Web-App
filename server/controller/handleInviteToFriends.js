const { PrismaClient } = require("@prisma/client");
const { json } = require("body-parser");
const prisma = new PrismaClient();

exports.getCloseFriends = async (req, res) => {
  const user = req.user;
  // console.log(user);

  try {
    if (user) {
      const currentUserFriends = await prisma.userTouser.findMany({
        where: {
          userRequested_id: user.userId,
          userStatus: 2,
        },
      });

      const friendData = currentUserFriends[0].userFollowed;
      if (currentUserFriends.length > 0) {
        const closefriendsData = await prisma.account.findMany({
          where: {
            userId: friendData,
          },
          include: {
            picture: true,
          },
        });
        console.log(closefriendsData);
        res.json(closefriendsData);
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "unexpected Error und on handlerFunction getCloseFriends ",
      });
  }
};
