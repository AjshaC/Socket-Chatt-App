import JoinChatContainer from "../components/JoinChatContainer/JoinChatContainer";
import Footer from "../components/Footer/Footer";
import "./Home.css"
export default function Home(){
    return(
        <div className="HomeWrapper">
            <h1 className="NeonText"><span className="LogoUppercase">chat</span> at eleven</h1>
            <JoinChatContainer/>
            <Footer></Footer>
        </div>
    )
    
}