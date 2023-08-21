import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SideBar/SideBar";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import "./ChatPage.css";

export default function ChatPage() {
  return (
    <div className="ChatPageWrapper">
      <Navbar />
      <div className="MainChatContent">
        <SideBar />
        <ChatWindow />
      </div>
    </div>
  );
}
