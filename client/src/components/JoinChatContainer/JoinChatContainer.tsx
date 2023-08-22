import "./JoinChatContainer.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Space } from "antd";
import { useChatContext } from "../../context/chatContext";

export default function JoinChatContainer() {
  const { user, setUser, connectToTheServer } = useChatContext();

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
            value={user}
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
