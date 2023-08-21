import "./Navbar.css";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import OpenPopUpBtn from "../OpenPopUpBtn/OpenPopUpBtn";

export default function Navbar() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <nav>
      <h1 className="Logo">
        <span className="LogoUppercase">chat</span> at eleven
      </h1>
      <div className="NavBtn">
        <OpenPopUpBtn />
        <Button className="CloseBtn" type="primary" onClick={goToHome}>
          <CloseOutlined />
        </Button>
      </div>
    </nav>
  );
}
