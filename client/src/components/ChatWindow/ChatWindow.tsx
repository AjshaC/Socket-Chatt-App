import "./ChatWindow.css"
import { Alert } from 'antd';



export default function ChatWindow(){
    return ( 
       
        <div className="ChatWindow">
            <div className="UserJoined">
            <h4>UserName Joined Chat</h4>
                
            </div>
            
            <div className="Userinfo">
             <p>UserName</p>
             <p>12:50</p>
            </div>
        
            <Alert className="message" message="Success Text" type="success" />

        </div>
    )
}


