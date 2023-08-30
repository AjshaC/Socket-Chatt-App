import "./SideBar.css";
import { useState, useEffect } from "react";
import { useChatContext } from "../../context/chatContext";
import { Button } from "antd";
import {
  UserOutlined,
  ArrowRightOutlined,
  TeamOutlined,
} from "@ant-design/icons";

interface RoomData {
  roomName: string;
  usernames: string[];
}

export default function SideBar() {
  const { socket, user, room, setRoom } = useChatContext();
  const [roomArray, setRoomArray] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState<RoomData[]>([]);

  useEffect(() => {
    socket.emit("get_room_array"); // Request roomArray from server

    socket.on("room_array", (data) => {
      setRoomArray(data); // Update the state with roomArray from the server
    });

    socket.on("users_in_room", (data) => {
      console.log(data); // Update the state with roomArray from the server
      setUsersInRoom(data);
    });
  }, []);

  const joinRoom = (newRoom: string) => {
    if (room) {
      socket.emit("leave_room", room); // Leave the old room
    }
    socket.emit("join_room", newRoom);
    setRoom(newRoom);
  };

  return (
    <div className="SideBar">
      <div className="ChatInLog">
        <p className="UserInfo">
          <UserOutlined /> {user}
        </p>
        <p className="RoomInfo">
          Room <ArrowRightOutlined /> {room}
        </p>
      </div>
      <div className="RoomList">
        {roomArray.map((room, index) => (
          <div key={index}>
            <Button
              type="primary"
              key={index}
              className="RoomButton"
              onClick={() => joinRoom(room)}
            >
              {room}
            </Button>

            <br />

            <p className="UserHeader">
              <span className="UserIcon"><TeamOutlined /></span> Online</p>

            <ul>
              {(
                usersInRoom.find((data) => data.roomName === room)?.usernames ||
                []
              ).map((username) => (
                <li key={username} className="UserInRoom">
                  {username}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
