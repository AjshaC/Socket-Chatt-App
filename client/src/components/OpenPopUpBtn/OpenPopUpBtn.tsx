import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import "./OpenPopUpBtn.css";

import { io } from "socket.io-client";

export default function OpenPopUpBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!newRoom) {
      console.log("no Room Name");
    } else {
      const socket = io("http://localhost:3000");
      socket.emit("join", newRoom);
      console.log(newRoom);
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
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Room name"
        ></Input>
      </Modal>
    </>
  );
}
