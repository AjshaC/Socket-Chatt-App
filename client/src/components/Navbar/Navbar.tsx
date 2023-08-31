import "./Navbar.css";
import { Button } from "antd";
//import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
//import { useChatContext } from "../../context/chatContext";
import CreateRoomPopUp from "../CreateRoomPopUp/CreateRoomPopUp";

export default function Navbar() {
  const navigate = useNavigate();
  //const { user } = useChatContext();

  const goToHome = () => {
    navigate("/");
  };


  return (
    <nav>
      <h1 className="LogoNav"><span className="LogoNavUppercase">chat</span> at eleven</h1>
      <div className="NavBtn">
    
        <CreateRoomPopUp />

        <Button type="primary" onClick={goToHome}>
          Exit
        </Button>
      </div>
    </nav>
  );
}
