import "./JoinChatContainer.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Space } from "antd";
import { useChatContext } from "../../context/chatContext";
import { useState } from "react";

export default function JoinChatContainer() {
  const { user, setUser, connectToTheServer } = useChatContext();
  const [errorInfo, setErrorInfo] = useState("");

  const navigate = useNavigate();

  const joinChatClick = () => {
    if (user.trim() !== "") {
      connectToTheServer();
      navigate("/chat");
    } else {
      setErrorInfo("*Username is required");
    }
  };

  return (
    <>
      <Card
        title="Please, choose a name to join a chat"
        className="JoinChatContainer"
        bordered={true}
        style={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #0c1f51",
        }}
      >
        <Space.Compact className="InputAndButton" style={{ width: "100%" }}>
          <Input
            className="usernameInput"
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

        <p className="errorInfo">{errorInfo}</p>
      </Card>
    </>
  );
}
