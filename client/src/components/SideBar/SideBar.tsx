import "./SideBar.css";
import { useState, useEffect } from "react";
import { useChatContext } from "../../context/chatContext";
import { Button} from "antd";


export default function SideBar() {
  const { socket, room } = useChatContext();

  const [roomArray, setRoomArray] = useState([]);

  useEffect(() => {
    socket.emit("get_room_array"); // Request roomArray from server

    socket.on("room_array", (data) => {
      setRoomArray(data); // Update the state with roomArray from the server
    });
  }, []);

  const joinThisRoom = () => {

      socket.emit("join_room", room); 
      console.log(room);
  };



  return (
    <div className="SideBar">
      <ul>
        {roomArray.map((room, index) => (
          <Button key={index} 
          onClick={(e) => joinThisRoom()}>
            {room}</Button>
        ))}
      </ul>
    </div>
  );
}
