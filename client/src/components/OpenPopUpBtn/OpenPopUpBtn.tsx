import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import "./OpenPopUpBtn.css";

import { io } from "socket.io-client";
import { useChatContext } from "../../context/chatContext";

export default function OpenPopUpBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { room, setRoom } = useChatContext();
  const [ newRoom, setNewRoom] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (!room.trim()) {
      console.log("No Room Name");
    } else {
      //const socket = io("http://localhost:3000");
      //socket.emit("join", room);
      
      setRoom(newRoom);
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
        onOk={handleOk} //BUTTON TO CREATE A NEW ROOM
        onCancel={handleCancel}
      >
        <Input
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Room name"
        ></Input>
      </Modal>

      {/*EXEMPEL*/}
      {/* <Button type="primary" onClick={() => setRoom("123")}>
        Room 123
      </Button>

      <Button type="primary" onClick={() => setRoom("456")}>
        Room 456
      </Button> */}
    </>
  );
}
