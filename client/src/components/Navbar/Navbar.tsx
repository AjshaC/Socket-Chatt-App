import "./Navbar.css";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/chatContext";

import OpenPopUpBtn from "../OpenPopUpBtn/OpenPopUpBtn";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, leaveRoom } = useChatContext();

  const goToHome = () => {
    navigate("/");
  };


  return (
    <nav>
      <h1 className="Logo">
        <span className="LogoUppercase">chat</span> at eleven
      </h1>
      <div className="NavBtn">
        <Button type="primary">
          <UserOutlined />
          {user}
        </Button>
        <OpenPopUpBtn />
        <Button type="primary" onClick={leaveRoom}>
          Leave room
        </Button>
        <Button type="primary" onClick={goToHome}>
          Exit
        </Button>
      </div>
    </nav>
  );
}
