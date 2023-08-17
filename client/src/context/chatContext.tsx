
import { createContext, useContext, useState, PropsWithChildren, useEffect } from "react";
import { io } from 'socket.io-client';


// export interface User {
//   username : string;
// }



interface IChatContext {
  user: string;
  userJoined:string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  connectToTheServer: (user:string) => void; 
}



export const ChatContext = createContext<IChatContext>({
  user:"",
  userJoined:"",
  setUser: () => {},
  connectToTheServer: (user:string) => {},
});

export const useChatContext= () => useContext(ChatContext);

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState("");
  const [userJoined, setUserJoined] = useState("");
  const socket = io('http://localhost:3000',  {autoConnect : false});

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

  return (
    <ChatContext.Provider value={{ user, setUser , userJoined, connectToTheServer }}>
      {children}
    </ChatContext.Provider>
  );
};