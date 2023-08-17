import "./ChatWindow.css"
import  { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { useChatContext } from "../../context/chatContext";
import { Button , Input} from 'antd';


export default function ChatWindow(){
    const {userJoined} = useChatContext();
    const {socket, user } = useChatContext();
    //const {message} = useChatContext();
    const {setMessage} = useChatContext();
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
    
//SEND MESSAGE
    const sendMessage = () => {
        socket.emit("send_message", { message: "Hello"});
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            alert(data.message);
        });
    }, [socket]);





  
    /*const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                author: user,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
        }
    }*/


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

            <div className="chat-footer">
                <Input onChange={(e)=> setMessage(e.target.value)} type="text" placeholder="Write your message..." />
                <Button onClick={sendMessage} type="primary">Send</Button>
            </div>

        
            <Alert className="message" message="Success Text" type="success" />

        </div>
    )
}


