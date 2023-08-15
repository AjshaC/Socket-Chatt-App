
import { io } from "socket.io-client";




export default function App() {

  const socket = io("http://localhost:3000/");

  return (
    <>
   <h1>Hello From client side</h1>
    </>
  )
}


