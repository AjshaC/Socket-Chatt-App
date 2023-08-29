import "./TypingIndicator.css";
import { useChatContext } from "../../context/chatContext";
import { useState } from "react";

export default function TypingIndicator() {
  const { isTyping, user } = useChatContext();
  

  return (
    <div>
      {isTyping && (
        <div className="TypingIndicator">

          <div className="whoIsTyping">
            <p className="name">{isTyping}</p>
          </div>

          <div className="DottingBox">
            <div className="DotTyping"></div>
          </div>
        </div>
      )}

      



    </div>
  );
}