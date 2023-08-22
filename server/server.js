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

//const rooms = []; SÄTTA LOGIKEN FÖR ATT SPARA RUM

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);

  //ADD ROOM
  //socket.on('join', ( user,room)=> {

  //socket.join(user,room);
  //console.log(`User with ID: ${socket.id} and username: ${user}, joined room: ${room}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    //console.log("User tries to join ", room);
    console.log(io.sockets.adapter.rooms);
  });

  //NEW USER JOINED CHAT
  //socket.broadcast.emit('userJoined', ` ${user} `);

  //SEND MESSAGE
  socket.on("send_message", (message) => {
    socket.broadcast.emit("receive_message", message); //KOMPLETTERA MED ROOM-ID HÄR SEDAN!!!!
    console.log(message);
  });
});

server.listen(3000, () => console.log("server is up"));
