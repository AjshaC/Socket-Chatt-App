import "./SideBar.css";
import { useState, useEffect } from "react";
import { useChatContext } from "../../context/chatContext";
import { Button} from "antd";
import { UserOutlined } from "@ant-design/icons";


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

      <div className="ChatInLog">
        <p className="UserInfo"><UserOutlined /> {user}</p>
        <p className="RoomInfo">You are in room: <br />
        <span className="RoomName">{room}</span></p>
      </div>

      <ul>
        {roomArray.map((room, index) => (
          <Button type="primary" key={index} className="RoomButton"
          onClick={() => joinRoom(room)}>
            {room}
          </Button>
        ))}
      </ul>
    </div>
  );
}
