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

//const rooms = []; SÄTTA LOGIKEN FÖR ATT SPARA RUM? Listan som uppdateras
const availableRooms = [];
const rooms = io.sockets.adapter.rooms;
const roomArray = Array.from(rooms.keys());


io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);

  //SAVE USERNAME
  const user = socket.handshake.auth.user;
  console.log(user);


  //ROOM
  socket.on("join_room", (room) => {
    socket.join(room);
    socket.broadcast.emit("userJoined", user);
    console.log(io.sockets.adapter.rooms);
    console.log("test");
    console.log(roomArray);
    socket.emit("room_array", roomArray);
    socket.broadcast.emit("userJoined", user); //ADD ROOM
    console.log(`User with ID: ${socket.id} and username ${user}, joined room: ${room}`);
  });


  //TYPING
  socket.on("typing", (data) => {
    socket.broadcast.emit('typingResponse', data); //ADD ROOM
  });

  
  //SEND MESSAGE
  socket.on("send_message", (message) => {
    socket.broadcast.emit("receive_message", message); //ADD ROOM
    console.log(message);
  });

});

server.listen(3000, () => console.log("server is up"));
