const { userModel } = require("./Models/user.model");

const adduser = async (name, room, sId) => {
   try {
    const User = await userModel.findOne({ name: name });
    const Room = await userModel.findOne({ room: room });

    if (User) {
      return { error: "user already exists" };
    }

    const newUser = await new userModel({
      username: name.trim().toLowerCase(),

      room: room.trim().toLowerCase(),

      SocketId: sId,

    });
    newUser.save();
    return { newUser: newUser };
  } catch (error) {
    console.log("errorr>>>", error);

    return { error: error };
  }
};

const removeUser = async (sId) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({ SocketId: sId });

    if (deletedUser) {
      console.log("User deleted successfully:", deletedUser);
      return { deletedUser };
    } else {
      console.log("User not found");
      return { error: "User not found" };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error };
  }
};

const getUser = async (sId) => {
  const user = await userModel.findOne({ SocketId: sId });

  if (user) {
    return user;
  }
};

const getAllUsersInRoom = async (room) =>{

          const user = await userModel.find({room: room});
          console.log(user);
          return user;

}

module.exports = { adduser, removeUser, getUser, getAllUsersInRoom};