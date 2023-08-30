import "./TypingIndicator.css";
import { useChatContext } from "../../context/chatContext";

export default function TypingIndicator() {
  const { isTyping, userTyping } = useChatContext();


  return (
    <div>
      {isTyping && userTyping !== "" && (
        <div className="TypingIndicator">

          <div className="whoIsTyping">
            <p className="name">{userTyping}</p>
          </div>

          <div className="DottingBox">
            <div className="DotTyping"></div>
          </div>
        </div>
      )}
    </div>
  );
}