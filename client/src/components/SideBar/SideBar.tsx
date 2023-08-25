import "./SideBar.css";
import { useState, useEffect } from "react";
import { useChatContext } from "../../context/chatContext";
import { Button} from "antd";


export default function SideBar() {
  const { socket, user, room, setRoom } = useChatContext();

  const [roomArray, setRoomArray] = useState([]);

  useEffect(() => {
    socket.emit("get_room_array"); // Request roomArray from server

    socket.on("room_array", (data) => {
      setRoomArray(data); // Update the state with roomArray from the server
    });
  }, []);

  const joinRoom = (newRoom : string) => {
    if (room) {
      socket.emit("leave_room", room); // Leave the old room
    }
    socket.emit("join_room", newRoom);
    setRoom(newRoom);
  };


  return (
    <div className="SideBar">
      <ul>
        {roomArray.map((room, index) => (
          <Button key={index} 
          onClick={() => joinRoom(room)}>
            {room}
          </Button>

        ))}
      </ul>
    </div>
  );
}
