import "./SideBar.css";
import { useState, useEffect } from "react";
import { useChatContext } from "../../context/chatContext";

export default function SideBar() {
  const { socket } = useChatContext();

  const [roomArray, setRoomArray] = useState([]);

  useEffect(() => {
    socket.emit("get_room_array"); // Request roomArray from server

    socket.on("room_array", (data) => {
      setRoomArray(data); // Update the state with roomArray from the server
    });
  }, []);

  return (
    <div className="SideBar">
      <ul>
        {roomArray.slice(1).map((room, index) => (
          <li key={index}>{room}</li>
        ))}
      </ul>
    </div>
  );
}
