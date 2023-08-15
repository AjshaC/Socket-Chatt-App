import "./JoinChatContainer.css";
import {useState} from "react";

import {useNavigate} from "react-router-dom" ;




export default function JoinChatContainer(){

    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const joinChatClick = () => {
        if(!username){
            console.log("no Username")
        }
        else{
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