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

const availableRooms = []

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);


  //SAVE USERNAME
  const user = socket.handshake.auth.user;
  console.log("Logged in with Username: ", user);


  //ROOM
  socket.on("join_room", (room) => {
    socket.join(room);
    socket.to(room).emit("userJoined", user);
    console.log(`User with ID: ${socket.id} and username ${user}, joined room: ${room}`);

  
    const rooms = io.sockets.adapter.rooms;
    console.log("ROOMS", rooms);
  
    //LÄGG SOM EN FUNKTION ISTÄLLET. SKICKAR IN INBYGGD LISTA TILL FUNKTIONEN, GÖR OM DEN OCH RETURNA VÅR LISTA
    //Loop over the Map items where key and value are not the same
    for (const [key, value] of rooms) {
      if (key !== value && !(value.size === 1 && value.has(key)) && !availableRooms.includes(key)) {
  
       //push to our room array
      availableRooms.push(key);
      console.log("AVAILABLE ROOMS", availableRooms);
  }
  }
  
  io.emit("room_array", availableRooms);
  });

  /*socket.on("leaveRoom", (room) => {
    socket.leave(room);
    io.to(room).emit(`user ${user} has left the room`);
    //socket.to(room).emit('user left', socket.id);
    console.log(`User ${user} disconnect from room: ${room}`)
  });*/


  //TYPING
  socket.on("typing", (data, room) => {
    socket.to(room).emit('typingResponse', data); //ADD ROOM
  });

  
  //SEND MESSAGE
  socket.on("send_message", (message) => {
    socket.to(message.room).emit("receive_message", message); //PROBLEM ATT FÅ UT MEDDELANDENA RÄTT NÄR MAN HOPPAR MELLAN RUM
    console.log(message);
  });

  //DISCONNECT
  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id)
  })

});

 //FUNKTIONEN HÄR!!!!! ÄVEN USER HÄR OM VI HINNER

server.listen(3000, () => console.log("server is up"));
