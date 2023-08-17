import "./ChatWindow.css"
import  { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { useChatContext } from "../../context/chatContext"



export default function ChatWindow(){
    const {userJoined} = useChatContext();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (userJoined) {
            setShowAlert(true);
            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // Hide after 10 seconds
            return () => clearTimeout(timeout);
        }
    }, [userJoined]);

    return ( 
       
        <div className="ChatWindow">
            <div className="UserJoined">
            {showAlert && (
                    <Alert
                        message={` ${userJoined} Joined Chat`}
                        type="success"
                        showIcon
                        closable
                    />
                )}
                
            </div>
            
            <div className="Userinfo">
             <p>UserName</p>
             <p>12:50</p>
            </div>
        
            <Alert className="message" message="Success Text" type="success" />

        </div>
    )
}


