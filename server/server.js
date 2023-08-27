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

let availableRooms = []

io.on("connection", (socket) => {
  //CONNECT TO SERVER
  console.log("New user connected: ", socket.id);


  //SAVE USERNAME
  const user = socket.handshake.auth.user;
  console.log("Logged in with Username: ", user);


  //ROOMLIST
  const rooms = io.sockets.adapter.rooms;


  //ROOM
  socket.on("join_room", (newRoom) => {
    socket.join(newRoom);
    socket.to(newRoom).emit("userJoined", user);
    console.log(`User with ID: ${socket.id} and username ${user}, joined room: ${newRoom}`);

    console.log("ROOMS", rooms);

    handleRooms()

    io.emit("room_array", availableRooms);
  });


  socket.on("leave_room", (room) => {

    socket.leave(room);
    console.log(`User ${user} disconnect from room: ${room}`)

    if (room && room !== "Lobby" ) {
 
      const index = availableRooms.indexOf(room);
      if (index !== -1) {
          availableRooms.splice(index, 1);
        }
      console.log("UPDATED ROOMLIST AFTER DELETE: ", availableRooms);
      io.emit("room_array", availableRooms);
    }
  });


  //TYPING
  socket.on("typing", (data, room) => {
      socket.to(room).emit('typingResponse', data);
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


 //ÄVEN LOGIK FÖR USER HÄR OM VI HINNER MED VG-DELEN
 function handleRooms() {

  const rooms = io.sockets.adapter.rooms;

  //Loop over the Map items where key and value are not the same
  for (const [key, value] of rooms) {
    if (key !== value && !(value.size === 1 && value.has(key)) && !availableRooms.includes(key)) {
      availableRooms.push(key);
    }
  }

  console.log("UPDATED ROOMLIST AFTER PUSH: ", availableRooms);
  return availableRooms;
};


server.listen(3000, () => console.log("server is up"));
