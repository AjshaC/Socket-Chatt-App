import JoinChatContainer from "../components/JoinChatContainer/JoinChatContainer";
import "./Home.css"
export default function Home(){
    return(
        <div className="HomeWrapper">
            <h1 className="logo"><span className="logo-uppercase">chat</span> at eleven</h1>
            <JoinChatContainer/>
        </div>
    )
    
}