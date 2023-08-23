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
  //connectToTheServer: (user:string) => void;
  connectToTheServer: () => void;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: Message[];
  setMessageList: Dispatch<SetStateAction<Message[]>>;
  roomList: Room[];
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
  const [roomList, setRoomList] = useState<Room[]>([]);

  /*const connectToTheServer = (user:string) =>{
       socket.connect();                 
       socket.emit('join', user , "lobby")
  }*/

  useEffect(() => {
    if (room && room !== socket.id) {
      socket.emit("join_room", room);
    }
  }, [room, socket.id]);

  const connectToTheServer = () => {
    socket.connect();
    socket.auth = { user };
    setIsLoggedIn(true);
    setRoom("Lobby");
  };

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
        roomList,
        setRoomList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
