import "./JoinChatContainer.css";
import {useNavigate} from "react-router-dom" ;
import { Button, Input, Card, Space} from 'antd';
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
    <>
        <Card title="Please, choose a name to join a chat" className="JoinChatContainer" bordered={false} style={{ maxWidth: 500 }}>
            <Space.Compact className="InputAndButton" style={{ width: '100%' }}>
                <Input defaultValue="Enter username ..." onChange={(e)=> setUser(e.target.value)} type="text" style={{ background: '#0c2042', color: 'whitesmoke', border: 'none'}} />
                <Button type="primary" onClick={joinChatClick}>Join</Button>
            </Space.Compact>
        </Card>
    </>
    )
}