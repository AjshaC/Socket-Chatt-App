import { useState } from "react";
import { Button, Modal, Input } from "antd";
import "./CreateRoomPopUp.css";
import { useChatContext } from "../../context/chatContext";

export default function CreateRoomPopUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { socket, room, setRoom } = useChatContext();
  const [newRoom, setNewRoom] = useState("");
  const [errorInfo, setErrorInfo] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!newRoom) {
      setErrorInfo("*Roomname is required");

      setTimeout(() => {
        setErrorInfo("");
      }, 5000);
    } else if (newRoom === room) {
      setErrorInfo("*Roomname already exists");

      setTimeout(() => {
        setErrorInfo("");
      }, 5000);
    } else {
      // Leave the current room, join the new room, and reset state

      socket.emit("leave_room", room);

      socket.emit("join_room", newRoom);

      setRoom(newRoom);

      setIsModalOpen(false);

      setNewRoom("");

      setErrorInfo("");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create room
      </Button>
      <Modal
        title="Create Room"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Room name"
        ></Input>
        <p className="errorInfo">{errorInfo}</p>
      </Modal>
    </>
  );
}
