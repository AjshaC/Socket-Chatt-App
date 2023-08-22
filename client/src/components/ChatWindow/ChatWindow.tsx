import "./ChatWindow.css";
import { useState, useEffect } from "react";
import { Alert } from "antd";
import { useChatContext } from "../../context/chatContext";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatWindow() {

  const {
    userJoined,
    socket,
    user,
    currentMessage,
    setCurrentMessage,
    messageList,
    setMessageList,
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

  
  //SEND MESSAGE
    const sendMessage = async () => {

      if (currentMessage !== "") {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

      const messageData = {
        //room: room, //KOMPLETTERA MED DETTA SENARE!!!
        author: user,
        message: currentMessage,
        time: hours + ":" + formattedMinutes,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
           
  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  

  return (

  <div className="ChatWindow">

<div className="ChatHeader">
  <p>...is typing</p>
</div>

   

      <div className="ChatBody">
        <ScrollToBottom className="MessageContainer">

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


          <div className="ChatFooter">
            <Input
              className="SendInput" 
              onChange={(e)=> setCurrentMessage(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                } else {
                  // Start typing indicator on any key press
                }
              }}
              type="text" 
              value={currentMessage} 
              placeholder="Write your message..." />

            <Button className="SendBtn" onClick={sendMessage} type="primary"><SendOutlined /></Button>
          </div>
  </div>
  
)}
