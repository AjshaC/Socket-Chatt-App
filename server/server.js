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

let usersNameInRoom = []

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);

  //SAVE USERNAME
  const user = socket.handshake.auth.user;
  console.log("Logged in with Username: ", user);

  //ROOM
  socket.on("join_room", (newRoom) => {
    socket.join(newRoom);
    socket.to(newRoom).emit("userJoined", user);
    console.log(
      `User with ID: ${socket.id} and username ${user}, joined room: ${newRoom}`
    );

    const newUser = {
      id: socket.id,
      username: user,
    }

    usersNameInRoom.push(newUser);

    const { availableRooms, usersIdInRoom } = handleRooms();

    io.emit('users', users);
    io.emit("room_array", availableRooms);
    io.emit("users_in_room", usersIdInRoom);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`User ${user} disconnect from room: ${room}`);
    const { availableRooms, usersIdInRoom } = handleRooms();

    io.emit("room_array", availableRooms);
    io.emit("users_in_room", usersIdInRoom);
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

    //UPDATE USERS WHEN SOMEONE LEAVES THE CHAT!! PUT THE CODE HERE!!!!

    io.emit("users_in_room", usersInRoom);
    io.emit("room_array", availableRooms);
  });
});

//ÄVEN LOGIK FÖR USER HÄR OM VI HINNER MED VG-DELEN

function handleRooms() {
  let availableRooms = [];
  let usersIdInRoom = [];

  const rooms = io.sockets.adapter.rooms;
  console.log("INBYGGDA LISTAN: ", io.sockets.adapter.rooms);
  //Loop over the Map items where key and value are not the same
  for (const [key, value] of rooms) {
    if (
      key !== value &&
      !(value.size === 1 && value.has(key)) &&
      !availableRooms.includes(key)
    ) {
      availableRooms.push(key);

      const usersIdArray = Array.from(value);
      usersIdInRoom.push({
        roomName: key,
        usersById: usersIdArray,
      });

      console.log("LOG -- USERS IN ROOM: ", usersIdInRoom);
    }
  }

  console.log("UPDATED ROOMLIST: ", availableRooms);

  //Check if Lobby are in the roomlist
  if (!availableRooms.includes("Lobby")) {
    availableRooms.push("Lobby");
  }

  return { availableRooms, usersIdInRoom };
}

server.listen(3000, () => console.log("server is up"));
