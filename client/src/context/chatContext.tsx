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

// export interface User {
//   username : string;
// }

interface User {
  username: string;
}

interface Message {
  author: string;
  message: string;
  time: string;
}

interface IChatContext {
  socket: Socket;
  user: string;
  userJoined: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  connectToTheServer: (user: string) => void;
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: Message[];
  setMessageList: Dispatch<SetStateAction<Message[]>>;
}

const socket = io("http://localhost:3000", { autoConnect: false });

export const ChatContext = createContext<IChatContext>({
  socket,
  user: "",
  userJoined: "",
  setUser: () => {},
  connectToTheServer: (user: string) => {},
  currentMessage: "",
  setCurrentMessage: () => {},
  messageList: [],
  setMessageList: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState("");
  const [userJoined, setUserJoined] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  const connectToTheServer = (user: string) => {
    socket.connect();
    socket.emit("join", user, "lobby");
  };

  useEffect(() => {
    socket.on("userJoined", (data) => {
      setUserJoined(data);
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setCurrentMessage(data);
      console.log(data);
    });
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        user,
        setUser,
        userJoined,
        connectToTheServer,
        currentMessage,
        setCurrentMessage,
        messageList,
        setMessageList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
