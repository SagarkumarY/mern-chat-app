

import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../Skeletons/messageSkeleton";

function Messages() {
  const { messages, loading } = useGetMessages();


  const messagesEndRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 100);
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    // Display loading skeletons
    return (
      <div className="px-4 flex-1  overflow-auto">
        {[...Array(3)].map((_, idx) => (
          <MessageSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    // Display message indicating no messages
    return (
      <div className="px-4 flex-1  overflow-auto">
        <p className="text-center">Send a message to start conversation</p>
      </div>
    );
  }

  // Display messages
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <div key={message._id} ref={messagesEndRef}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}

export default Messages;




// import React from "react";
// import Message from "./Message";
// import useGetMessages from "../../hooks/useGetMessages";
// import MessageSkeleton from "../Skeletons/messageSkeleton";
// function Messages() {
//   const { messages, loading } = useGetMessages();
//   console.log("Messages", messages); // Check the log here
//   return (
//     <div className="px-4 flex-1  overflow-auto">
//       {!loading &&
//         messages.length > 0 &&
//         messages.map((message) => (
//           <Message key={message._id} message={message} />
//         ))}
//       {!loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
//       {!loading && messages.length === 0 && (
//         <p className=" text-center">Send a message to start conversation</p>
//       )}
//     </div>
//   );
// }

// export default Messages;