import Navbar from "../components/Navbar/Navbar"
import SideBar from "../components/SideBar/SideBar"
import ChatWindow from "../components/ChatWindow/ChatWindow"
import WriteAndSendContainer from "../components/WriteAndSendContainer/WriteAndSendContainer"

export default function ChatPage(){
    return(
        <div className="ChatPageWrapper">
            <Navbar/>
            <div className="MainChatContent">
                <SideBar/>
                <ChatWindow/>
            </div>
            <WriteAndSendContainer/>
        </div>
    )
}