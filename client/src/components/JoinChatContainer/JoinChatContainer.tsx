import "./JoinChatContainer.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Space } from "antd";
import { useChatContext } from "../../context/chatContext";
import { useEffect } from "react";

export default function JoinChatContainer() {
  const { socket, user, setUser, connectToTheServer } = useChatContext();

  const navigate = useNavigate();

  /*const joinChatClick = () => {
        if(user.trim() !== ""){
            connectToTheServer()
            navigate("/chat");
        }
                   
        else{
             console.log("no Username", user)
        }
        
    }*/

  const joinChatClick = () => {
    connectToTheServer();
    navigate("/chat");

    useEffect(() => {
      socket.emit("join_default_room"); // Emit event to join the default room
    }, []);
  };

  return (
    <>
      <Card
        title="Please, choose a name to join a chat"
        className="JoinChatContainer"
        bordered={false}
        style={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Space.Compact className="InputAndButton" style={{ width: "100%" }}>
          <Input
            placeholder="Enter username ..."
            onChange={(e) => setUser(e.target.value)}
            type="text"
            style={{
              background: "#0c2042",
              color: "whitesmoke",
              border: "none",
            }}
          />
          <Button type="primary" onClick={joinChatClick}>
            Join
          </Button>
        </Space.Compact>
      </Card>
    </>
  );
}
