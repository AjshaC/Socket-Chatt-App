import { io } from "socket.io-client";
import ChatPage from "./pages/chatPage";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";

export default function App() {

  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/chat" element={<ChatPage />}  />
      </Routes>
 
    </div>
  )
}


