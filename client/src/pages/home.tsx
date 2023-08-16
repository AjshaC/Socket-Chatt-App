import JoinChatContainer from "../components/JoinChatContainer/JoinChatContainer";
import "./Home.css"
export default function Home(){
    return(
        <div className="HomeWrapper">
            <h1>eleven <span className="logo-part-two">chatt</span></h1>
            <JoinChatContainer/>
        </div>
    )
    
}