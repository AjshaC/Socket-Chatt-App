import { useState } from "react";
import { Button, Modal, Input } from "antd";
import "./OpenPopUpBtn.css";
import { useChatContext } from "../../context/chatContext";
import { io } from "socket.io-client";
import { room, setRoom } from useChatContext();


export default function OpenPopUpBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!room) {
      console.log("no Room Name");
    } else {
      const socket = io("http://localhost:3000");
      socket.emit("join", room);
      console.log(room);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button className="OpenPopUpBtn" type="primary" onClick={showModal}>
        Create room
      </Button>
      <Modal
        title="Create Room"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room name"
        ></Input>
      </Modal>
    </>
  );
}
