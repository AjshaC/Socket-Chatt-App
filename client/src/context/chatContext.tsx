import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  room: string;
  author: string;
  message: string;
  time: string;
}

interface Room {
  name: string;
}


interface IChatContext {
  socket: Socket;
  user: string;
  isLoggedIn: boolean;
  userJoined: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  connectToTheServer: () => void;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: Message[];
  setMessageList: Dispatch<SetStateAction<Message[]>>;
  sendMessage: () => void;
  roomList: Room[];
  setRoomList: Dispatch<SetStateAction<Room[]>>;
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  //whenTyping: () => void;
}

const socket = io("http://localhost:3000", { autoConnect: false });

const defaultValues = {
  socket,
  user: "",
  isLoggedIn: false,
  userJoined: "",
  room: "",
  setRoom: () => {},
  setUser: () => {},
  connectToTheServer: () => {},
  currentMessage: "",
  setCurrentMessage: () => {},
  messageList: [],
  setMessageList: () => {},
  sendMessage: () => {},
  roomList: [],
  setRoomList: () => {},
  isTyping: false,
  setIsTyping: () => {},
  //whenTyping: () => {},
};

export const ChatContext = createContext<IChatContext>(defaultValues);

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userJoined, setUserJoined] = useState("");
  const [room, setRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  /*const connectToTheServer = (user:string) =>{
       socket.connect();                 
       socket.emit('join', user , "lobby")
  }*/


  //CONNECT TO SERVER
  const connectToTheServer = () => {
    socket.connect();
    socket.auth = { user };
    setIsLoggedIn(true);
    setRoom("Lobby");
  };


  //ROOM
  useEffect(() => {
    if (room) {
      socket.emit("join_room", room, user);
    }
  }, [room]);


/*function leaveRoom() {
    socket.emit("leaveRoom", room);
    setRoom("Lobby"); 
    console.log(user, " leaved the room: ", room);
};*/

  //TYPING
  /*const handleTyping = () => {
    setIsTyping(true)
    socket.emit('typing', user)
  }

  const stopTyping = () => {
    setIsTyping(false)
  }*/
  
//useeffect som lyssnar på currentMessage -> skicka   socket.emit('typing', user) till servern, skicka med room, variabel isTyping If ...
//Sätt vår isTyping till true eller false
//whoIsTyping som ett state??

//useEffect som lyssnar på om currentMessage ändras -> då skickar vi socket.emit('typing', user) till servern. Även room bör skickas med

//skapa const isTyping -> if: currentMessage.length = 0 = false, currentMessage.length = minst 1 = true BOOLEAN
//servern ska skicka tillbaka och det blir vår setIsTyping


//sätt ett till state med whoIsTyping? -> string, user

/*const whenTyping = () => {
  if (currentMessage.length === 0 ) {
    setIsTyping(false)
  } else {
    setIsTyping(true)
  }
}*/

useEffect(() => 
{ if (currentMessage.length < 1) 
  { setIsTyping(false); } 
  else 
  { setIsTyping(true);} 
  socket.emit('typing', user, room)
}, [currentMessage]);



  //SEND MESSAGE
  const sendMessage = () => {

    if (currentMessage !== "") {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

    const messageData = {
      room: room,
      author: user,
      message: currentMessage,
      time: hours + ":" + formattedMinutes,
    };

    socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");
  }
};


  //SOCKET
  useEffect(() => {
    socket.on("userJoined", (data) => {
      setUserJoined(data);
    });

    socket.on("typingResponse", (data) => {
      setIsTyping(data);
      console.log(data, "is typing ...")
    }); 

    socket.on("sendMessage", (data) => {
      setCurrentMessage(data);
    });

    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });

    /*socket.on("leaveRoom", (data) => {
      console.log("Disconnected from room: ", data)
    });*/

    /*return () => {
      socket.disconnect();
    };*/
  }, [socket]);

  
  useEffect(() => {
    socket.on("room_array", (roomArray: Room[]) => {
      console.log("Received room list from server", roomArray);
      setRoomList(roomArray);
    });
  }, []);


  return (
    <ChatContext.Provider
      value={{
        socket,
        user,
        isLoggedIn,
        setUser,
        userJoined,
        room,
        setRoom,
        connectToTheServer,
        currentMessage,
        setCurrentMessage,
        messageList,
        setMessageList,
        sendMessage,
        roomList,
        setRoomList,
        isTyping,
        setIsTyping,
        //whenTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
