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

const roomList = [];

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);

  //SAVE USERNAME
  const user = socket.handshake.auth.user;
  console.log(user);

  //CREATE ROOM
    // Listen for createRoom event
    socket.on('createRoom', (room) => {
      // Create a new room
      const newRoom = {
        name: room,
        // Add other room details if needed
      };
      roomList.push(newRoom);
  
      // Emit updated room list to all clients
      io.emit('updateRoomList', roomList);
    });


  //ADD ROOM
  socket.on("join_room", (room) => {
    socket.join(room);
    socket.broadcast.emit("userJoined", user);
    // console.log(`User with ID: ${socket.id} and username ${user}, joined room: ${room}`);
    console.log(io.sockets.adapter.rooms);
  });

  //SEND MESSAGE
  socket.on("send_message", (message) => {
    socket.broadcast.emit("receive_message", message);
    console.log(message);
  });
});

server.listen(3000, () => console.log("server is up"));
