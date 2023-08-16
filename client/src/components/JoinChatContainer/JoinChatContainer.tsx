import "./JoinChatContainer.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom" ;

//-----------------------------Room-Context----------------------------------//
import { io } from 'socket.io-client';


export default function JoinChatContainer(){

    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const joinChatClick = () => {
        if(!username){
            console.log("no Username")
        }
        else{
            const socket = io('http://localhost:3000');
            socket.emit('join', 'lobby')
            console.log("no Username")
            navigate("/chat");
        }
        
    }

    return (
        <div>
            <input onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="UserName"/>
            <button onClick={joinChatClick}>Join</button>
        </div>
    )
}