const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const { ConnectDb } = require("./Database/db.confing");
const { adduser, removeUser, getUser, getAllUsersInRoom } = require("./entity");
const { userModel } = require("./Models/user.model");
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });
require("dotenv").config();

app.get("/", (req, res) => {
  res.status(200).json("api working");
});

io.on("connect", async (socket) => {
  console.log("SID : ", socket.id);
  console.log("user connected");

  socket.on("join", async ({ name, room }, callback) => {
    console.log(name, room);

    const { error, newUser } = await adduser(name, room, socket.id);

    if (error) {
      console.log(error);
      callback(error);
      return;
    }

    console.log("new user added", newUser);

    await socket.join(newUser.room);

    await socket.emit("message", {
      user: "admin",
      text: `welcome ${newUser.username}`,
    });

    await socket.broadcast
      .to(newUser.room)
      .emit("message", { user: "admin", text: `${newUser.username} joined` });

    await io
      .to(newUser.room)
      .emit("activeusers", await getAllUsersInRoom(newUser.room));
  });

  socket.on("sendMsg", async (msg, callback) => {
    const user = await getUser(socket.id);

    console.log("s3", socket.id);

    if (user) {
      await io
        .to(user.room)
        .emit("message", { user: user.username, text: msg });
    } else {
      await callback("user not found");
    }
    callback();
  });

  socket.on("disconnect", async () => {
    const { deletedUser } = await removeUser(socket.id);
    if (deletedUser) {
      await io.to(deletedUser.room).emit("message", {
        user: "admin",
        text: `${deletedUser.username} left`,
      });
      console.log("user deleted successfully");

      await io
        .to(deletedUser.room)
        .emit("activeusers", await getAllUsersInRoom(deletedUser.room));
    }

    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("app listening on port 4000");
});

ConnectDb();
