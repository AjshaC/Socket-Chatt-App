import "./JoinChatContainer.css";
import {useNavigate} from "react-router-dom" ;
import { Button, Input} from 'antd';
import { useChatContext} from "../../context/chatContext";

export default function JoinChatContainer(){
    const {user, setUser, connectToTheServer} = useChatContext();


    const navigate = useNavigate();

    const joinChatClick = () => {
        if(user.trim() !== ""){
            connectToTheServer(user)
            navigate("/chat");
        }
                   
        else{

             console.log("no Username", user)

        }
        
    }

    return (
   
        <div className="JoinChatContainer">

            <Input className="UserNameInput" onChange={(e)=> setUser(e.target.value)} type="text" placeholder="Enter username..."/>
            <Button className="JoinBtn" type="primary" onClick={joinChatClick}>Join A Chat</Button>
        </div>
    )
}