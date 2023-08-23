import "./Navbar.css";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/chatContext";

import OpenPopUpBtn from "../OpenPopUpBtn/OpenPopUpBtn";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useChatContext();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <nav>
      <h1 className="Logo">
        <span className="LogoUppercase">chat</span> at eleven
      </h1>
      <div className="NavBtn">
        <Button type="primary">{user}</Button>
        <OpenPopUpBtn />
        <Button className="CloseBtn" type="primary" onClick={goToHome}>
          Exit
        </Button>
      </div>
    </nav>
  );
}
