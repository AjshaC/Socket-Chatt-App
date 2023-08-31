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
  userTyping: string;
  setUserTyping: React.Dispatch<React.SetStateAction<string>>;
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
  userTyping: "",
  setUserTyping: () => {},
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
  const [userTyping, setUserTyping] = useState("");

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

    //Reset messageList when room changes
    setMessageList([]);
  }, [room]);

  //TYPING
  useEffect(() => {
    if (currentMessage.length >= 1) {
      setIsTyping(true);
      socket.emit("typing", { isTyping: true, room: room, userTyping: user });
      
    } else {
      setIsTyping(false);
      socket.emit("typing", { isTyping: false, room: room, userTyping: "" });
    }
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

    socket.on("typing_status", (typing) => {
      setIsTyping(typing.isTyping);
    });

    socket.on("typing_user", (typing) => {
      setUserTyping(typing.userTyping);
    });

    socket.on("sendMessage", (data) => {
      setCurrentMessage(data);
    });

    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });

    // socket.on("leave_room", (data) => {
    // });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    socket.on("room_array", (roomArray: Room[]) => {
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
        userTyping,
        setUserTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
