import "./ChatWindow.css";
import { useState, useEffect } from "react";
import { Alert } from "antd";
import { useChatContext } from "../../context/chatContext";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatWindow() {
  const {
    userJoined,
    user,
    currentMessage,
    setCurrentMessage,
    messageList,
    sendMessage,
  } = useChatContext();

  //FetchGifs
  const useGif = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/stickers/random?api_key=${
        import.meta.env.VITE_API_KEY
      }&tag=&rating=g`
    );
    const data = await response.json();
    setCurrentMessage(data.data.images.downsized.url);
  };

  const handleClick = () => {
    setIsGif(false);
    sendMessage();
  };

  //SHOW THAT A NEW USER JOIN CHAT
  const [showAlert, setShowAlert] = useState(false);
  const [gif, setIsGif] = useState(false);

  useEffect(() => {
    if (userJoined) {
      setShowAlert(true);
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [userJoined]);

  return (
    <div className="ChatWindow">
      <div className="ChatHeader">
        <TypingIndicator />
      </div>

      <div className="ChatBody">
        {/*SHOW WHEN A NEW USER JOIN CHAT*/}
        <div className="UserJoined">
          {showAlert && (
            <Alert
              message={` ${userJoined} Joined Chat`}
              type="info"
              showIcon
            />
          )}
        </div>

        <ScrollToBottom className="MessageContainer">
          {/*RENDER MESSAGES*/}
          {messageList.map((messageContent) => {
            const messageKey = `${messageContent.message}-${messageContent.time}`;

            return (
              <div
                className="Message"
                key={messageKey}
                id={user === messageContent.author ? "You" : "Other"}
              >
                <div className="MessageBox">
                  <div className="MessageContent">
                    {messageContent.message.startsWith("https://media") ? (
                      <img
                        src={messageContent.message}
                        alt="Image"
                        height={100}
                      />
                    ) : (
                      <p>{messageContent.message}</p>
                    )}
                  </div>

                  <div className="MessageMeta">
                    <p>{messageContent.time}</p>
                    <p className="Author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      {/*INPUT FOR WRITE AND SEND MESSAGES*/}
      <div className="ChatFooter">
        {gif ? (
          <img src={currentMessage} alt="" width={100} />
        ) : (
          <Input
            className="SendInput"
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              if (e.target.value === "/gif") {
                useGif();
                setIsGif(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            value={currentMessage}
            placeholder="Write your message..."
          />
        )}

        <Button className="SendBtn" onClick={handleClick} type="primary">
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
}
