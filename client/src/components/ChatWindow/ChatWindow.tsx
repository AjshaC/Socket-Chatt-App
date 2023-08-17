import "./ChatWindow.css"
import { Alert } from 'antd';
import { useChatContext } from "../../context/chatContext"



export default function ChatWindow(){
    const {userJoined} = useChatContext();

    return ( 
       
        <div className="ChatWindow">
            <div className="UserJoined">
            <h4> {userJoined} Joined Chat</h4>
                
            </div>
            
            <div className="Userinfo">
             <p>UserName</p>
             <p>12:50</p>
            </div>
        
            <Alert className="message" message="Success Text" type="success" />

        </div>
    )
}


