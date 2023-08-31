import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SideBar/SideBar";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import Footer from "../components/Footer/Footer";
import "./ChatPage.css";

export default function ChatPage() {
  return (
    <div className="ChatPageWrapper">
      <Navbar />
      <div className="MainChatContent">
        <SideBar />
        <ChatWindow />
      </div>
      <Footer></Footer>
    </div>
  );
}
