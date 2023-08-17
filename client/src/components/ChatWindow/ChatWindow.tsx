import "./ChatWindow.css"
import  { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { useChatContext } from "../../context/chatContext";
import { Button , Input} from 'antd';


export default function ChatWindow(){
    const {userJoined, socket, user, currentMessage, setCurrentMessage, messageList, setMessageList} = useChatContext();
 
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
    const sendMessage = async () => {

        if (currentMessage !== "") {
            const messageData = {
                //room: room,
                author: user,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
   
    };

    useEffect(() => {
        socket.on("receive_message", (message) => {
            setMessageList((list) => [...list, message]);
        });
    }, [socket]);

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
                {messageList.map((messageContent) => {
                    return (
                        <div className="message"> 
                            <div className="messageContent">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="messageMeta">
                                <p>{messageContent.time}</p>
                                <p>{messageContent.author}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Alert className="message" message="Success Text" type="success" />

            <div className="chat-footer">
                <Input onChange={(e)=> setCurrentMessage(e.target.value)} type="text" placeholder="Write your message..." />
                <Button onClick={sendMessage} type="primary">Send</Button>
            </div>

        </div>
    )
}


