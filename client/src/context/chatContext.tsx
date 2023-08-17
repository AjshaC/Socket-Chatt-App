
import { createContext, useContext, useState, PropsWithChildren, useEffect } from "react";
import { io, Socket } from 'socket.io-client';


// export interface User {
//   username : string;
// }



interface IChatContext {
  socket: Socket,
  user: string;
  userJoined:string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  connectToTheServer: (user:string) => void; 
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const socket = io('http://localhost:3000',  {autoConnect : false});

export const ChatContext = createContext<IChatContext>({
  socket,
  user:"",
  userJoined:"",
  setUser: () => {},
  connectToTheServer: (user:string) => {},
  message:"",
  setMessage: () => {}
});

export const useChatContext= () => useContext(ChatContext);

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState("");
  const [userJoined, setUserJoined] = useState("");
  const [message, setMessage] = useState("");

  const connectToTheServer = (user:string) =>{

       socket.connect();                 
       socket.emit('join', user , "lobby")
  }

  useEffect(()=>{
    socket.on('userJoined',(data) =>{
      setUserJoined(data);
      console.log(data);
    })
    
  },[socket])

  useEffect(()=>{
    socket.on('sendMessage',(data) =>{
      setMessage(data);
      console.log(data);
    })
  },[socket])

  return (
    <ChatContext.Provider value={{ socket, user, setUser , userJoined, connectToTheServer, message, setMessage }}>
      {children}
    </ChatContext.Provider>
  );
};