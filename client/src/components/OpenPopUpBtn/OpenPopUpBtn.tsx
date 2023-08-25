import { useState } from "react";
import { Button, Modal, Input } from "antd";

import "./OpenPopUpBtn.css";

import { useChatContext } from "../../context/chatContext";

export default function OpenPopUpBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { room, setRoom } = useChatContext();
  const [newRoom, setNewRoom] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!room.trim()) {
      console.log("No Room Name");
    } else {
      setRoom(newRoom);
      setNewRoom("");
      setIsModalOpen(false);
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
      </Modal>
    </>
  );
}
