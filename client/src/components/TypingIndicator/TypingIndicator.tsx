import "./TypingIndicator.css";
import { useChatContext } from "../../context/chatContext";

export default function TypingIndicator() {
  const { isTyping } = useChatContext();

  return (
    <div>
      {isTyping && (
        <div className="TypingIndicator">

          <div className="whoIsTyping">
            <p className="name"></p>
          </div>

          <div className="DottingBox">
            <div className="DotTyping"></div>
          </div>
        </div>
      )}
    </div>
  );
}