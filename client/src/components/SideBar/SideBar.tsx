import "./SideBar.css";
import { useChatContext } from "../../context/chatContext";

export default function SideBar() {

  const {
    //room,
    roomList,
    //setRoomList
  } = useChatContext();


  return (
    <div className="SideBar">
      <ul>
        Rooms
        <li>Room 1</li>
        <li>Room 2</li>
        <li>Room 3</li>
        <li>Room 4</li>
      </ul>

      <div>
        <h1>Chat Rooms</h1>
      <ul>
        {roomList.map((room) => (
          <li key={room.name}>{room.name}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}
