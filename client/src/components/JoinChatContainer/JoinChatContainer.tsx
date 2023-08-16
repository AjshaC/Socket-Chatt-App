import "./JoinChatContainer.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom" ;
import { Button, Input} from 'antd';


import { io } from 'socket.io-client';


export default function JoinChatContainer(){

    const socket = io('http://localhost:3000',  {autoConnect : false});
     
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const joinChatClick = () => {
        if(!username){
            console.log("no Username")
        }
        else{

            socket.connect();
            socket.emit('join', 'lobby')
            console.log(username)
            navigate("/chat");
        }
        
    }

    return (
   
        <div className="JoinChatContainer">
            <Input className="UserNameInput" onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Enter username..."/>
            <Button className="JoinBtn" type="primary" onClick={joinChatClick}>Join A Chat</Button>
        </div>

    )
}