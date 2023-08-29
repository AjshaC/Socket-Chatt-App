const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Final array of users in each room that we send to client side:
let newUser = [];

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);

  //SAVE USERNAME
  const user = socket.handshake.auth.user;
  console.log("Logged in with Username: ", user);

  //JOIN ROOM
  socket.on("join_room", (newRoom) => {
    socket.join(newRoom);
    socket.to(newRoom).emit("userJoined", user);
    console.log(
      `User with ID: ${socket.id} and username ${user}, joined room: ${newRoom}`
    );

    //NEW USER CONTAINS ID AND USERNAME
    const newUserInfo = {
      id: socket.id,
      username: user,
    };
    newUser.push(newUserInfo);

    const { availableRooms, usersInRoom } = handleRooms();

    io.emit("room_array", availableRooms);
    io.emit("users_in_room", usersInRoom);
  });

  //LEAVE ROOM
  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`User ${user} disconnect from room: ${room}`);
    const { availableRooms, usersInRoom } = handleRooms();
    io.emit("room_array", availableRooms);
    io.emit("users_in_room", usersInRoom);
  });

  //TYPING
  socket.on("typing", (data, room) => {
    socket.to(room).emit("typingResponse", data);
  });

  //SEND MESSAGE
  socket.on("send_message", (message) => {
    socket.to(message.room).emit("receive_message", message);
    console.log(message);
  });

  //DISCONNECT
  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
    const { availableRooms, usersInRoom } = handleRooms();
    io.emit("users_in_room", usersInRoom);
    io.emit("room_array", availableRooms);
  });
});

//FUNCTION THAT HANDLES ROOMLIST AND USERLIST
function handleRooms() {
  let availableRooms = [];
  let usersInRoom = [];

  //OBTAIN ARRAY OF ROOMS
  const rooms = io.sockets.adapter.rooms;
  console.log("INBYGGDA LISTAN: ", io.sockets.adapter.rooms);

  //Loop over the Map items where key and value are not the same (to remove id from roomlist)
  for (const [key, value] of rooms) {
    if (
      key !== value &&
      !(value.size === 1 && value.has(key)) &&
      !availableRooms.includes(key)
    ) {
      availableRooms.push(key); //ADD ROOM TO ROOMLIST

      //CREATE ARRAY OF USERS IDs FROM SOCKET ADAPTER
      const usersIdArray = Array.from(value);

      // CONVERT IDS TO USERNAMES
      const usernamesArray = usersIdArray.map((userId) => {
        const foundUser = newUser.find((user) => user.id === userId);
        return foundUser ? foundUser.username : userId;
      });

      //ADD ID ARRAY TO USERS IN ROOM
      usersInRoom.push({
        roomName: key,
        usernames: usernamesArray,
      });

      console.log("LOG -- USERS IN ROOM: ", usersInRoom);
    }
  }

  //CHECK IF LOBBY IS IN ROOMLIST, OTHERWISE ADD IT
  if (!availableRooms.includes("Lobby")) {
    availableRooms.push("Lobby");
  }

  return { availableRooms, usersInRoom };
}

server.listen(3000, () => console.log("server is up"));
