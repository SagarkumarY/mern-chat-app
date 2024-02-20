// import { useEffect } from 'react';
// import {useSocketContext}  from '../context/SocketContect'
// import useConversation from '../zustand/useConversation';

// function useListenMessages() {
//  const {socket} = useSocketContext();

//  const {messages,setMessages} = useConversation();


//  useEffect(()=>{
//     socket?.on("newMessage",(newMessage)=>{
//         setMessages([...messages,newMessage])
//     });

//     return socket?.off("newMessage"); 
//  },[socket,setMessages,messages])
// }

// export default useListenMessages


import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContect';
import useConversation from '../zustand/useConversation';
import   notificationSound from '../assets/sound/notification.mp3'

function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return; // Check if socket is available

    const handleNewMessage = (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
      setMessages([...messages, newMessage]);
    };

    // Add event listener for new messages
    socket.on("newMessage", handleNewMessage);

    // Return a cleanup function to remove the event listener
    return () => {
      // Remove the event listener for new messages
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, messages]);
}

export default useListenMessages;
