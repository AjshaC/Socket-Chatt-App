import "./Navbar.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/chatContext";
import CreateRoomPopUp from "../CreateRoomPopUp/CreateRoomPopUp";

export default function Navbar() {
  const { socket } = useChatContext();
  const navigate = useNavigate();

  const goToHome = () => {
    if (socket) {
      socket.disconnect();
      navigate("/");
    }
  };

  return (
    <nav>
      <h1 className="LogoNav">
        <span className="LogoNavUppercase">chat</span> at eleven
      </h1>
      <div className="NavBtn">
        <CreateRoomPopUp />

        <Button type="primary" onClick={goToHome}>
          Exit
        </Button>
      </div>
    </nav>
  );
}
