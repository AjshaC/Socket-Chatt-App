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
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  roomList:Room[],
  setRoomList: Dispatch<SetStateAction<Room[]>>;
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
  isTyping: false,
  setIsTyping: () => {},
  roomList: [],
  setRoomList: () => {},
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
  const [isTyping, setIsTyping] = useState(false);
  const [roomList, setRoomList] = useState<Room[]>([]);

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
      socket.emit("join_room", room);
    }
  }, [room]);

  useEffect(() => {
    // Listen for updated room list from the server
    socket.on('updateRoomList', (updatedRooms) => {
      console.log('Updated Room List:', updatedRooms);
      setRoomList(updatedRooms);
    });

    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off('updateRoomList');
    };
  }, []);


  //SOCKET
  useEffect(() => {
    socket.on("userJoined", (data) => {
      setUserJoined(data);
      console.log(data);
    });
    socket.on("sendMessage", (data) => {
      setCurrentMessage(data);
      console.log(data);
    });
  }, [socket]);


  //TYPING
  useEffect(() => {
    if (isTyping) {
      socket.emit('typing', user);
      console.log(user, " is typing...")
    } else {
      socket.emit('stoppedTyping', user);
    }
  }, [isTyping, user]);


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
        isTyping,
        setIsTyping,
        roomList,
        setRoomList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
