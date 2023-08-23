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

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);

  const user = socket.handshake.auth.user;
  console.log(user);

  //ADD ROOM
  socket.on("join_room", (room) => {
    socket.join(room);
    socket.broadcast.emit("userJoined", user);
    // console.log(`User with ID: ${socket.id} and username ${user}, joined room: ${room}`);
    console.log(io.sockets.adapter.rooms);
    const rooms = io.sockets.adapter.rooms;
    const roomArray = Array.from(rooms.keys());
    console.log("test");
    console.log(roomArray);
    socket.emit("room_array", roomArray);
  });

  //SEND MESSAGE
  socket.on("send_message", (message) => {
    socket.broadcast.emit("receive_message", message);
    console.log(message);
  });
});

server.listen(3000, () => console.log("server is up"));
