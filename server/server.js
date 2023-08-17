const express = require('express');
const http = require('http');
const app = express();
const {Server} = require('socket.io');
const cors = require('cors');
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });


  io.on("connection", (socket)=>{
    console.log(socket.id);
//add room

      socket.on('join', ( user,room)=> {

      socket.join(user,room);

      console.log(`User ${socket.id} with ${user},  joined room ${room}`);

      //
      
      socket.broadcast.emit('userJoined', `User ${user} `);
      //  socket.broadcast.emit

    })

//add room

  })

  server.listen(3000, () => console.log("server is up"));