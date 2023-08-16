
import { io } from "socket.io-client";

import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";


export default function App() {

  const socket = io("http://localhost:3000/", {autoConnect : false});

 


  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/chat" element={<ChatPage />}  />
      </Routes>
 
    </div>
  )
}


