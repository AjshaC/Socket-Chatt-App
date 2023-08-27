import "./ChatWindow.css";
import { useState, useEffect } from "react";
import { Alert } from "antd";
import { useChatContext } from "../../context/chatContext";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ScrollToBottom from "react-scroll-to-bottom";
import TypingIndicator from "../TypingIndicator/TypingIndicator";

export default function ChatWindow() {

  const {
    userJoined,
    currentMessage,
    setCurrentMessage,
    messageList,
    sendMessage,
  } = useChatContext();

  
  //SHOW THAT A NEW USER JOIN CHAT
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (userJoined) {
      setShowAlert(true);
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 5000); // Hide after 10 seconds
      return () => clearTimeout(timeout);
    }
  }, [userJoined]);

  
  return (

  <div className="ChatWindow">
   
    <div className="ChatHeader">
      {/*TYPING INDICATOR*/}
      <TypingIndicator />
    </div>
  
    <div className="ChatBody">
      <ScrollToBottom className="MessageContainer">

      {/*SHOW WHEN A NEW USER JOIN CHAT*/}
      <div className="UserJoined">
        {showAlert && (
          <Alert
            message={` ${userJoined} Joined Chat`}
            type="success"
            showIcon
            closable
          />
        )}
      </div>
      
      {/*RENDER MESSAGES*/}
      {messageList.map((messageContent) => {
        const messageKey = `${messageContent.message}-${messageContent.time}`;
          return (
          <div className="Message" key={messageKey}>

            <div className="MessageContent">
              <p>{messageContent.message}</p>
            </div>

            <div className="MessageMeta">
              <p>{messageContent.time}</p>
              <p>{messageContent.author}</p>
            </div>
          </div>
          )
        })}
        </ScrollToBottom>
      </div>

      {/*INPUT FOR WRITE AND SEND MESSAGES*/}
      <div className="ChatFooter">
        <Input
          className="SendInput" 
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
              }
            }}
          type="text" 
          value={currentMessage} 
          placeholder="Write your message..." />

        <Button className="SendBtn" onClick={sendMessage} type="primary"><SendOutlined /></Button>
      </div>
  </div>
)}
