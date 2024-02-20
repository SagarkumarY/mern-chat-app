import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

function Message({ message }) {
  // Convert the message time string to a Date object
  const messageDate = new Date(message.createdAt);
  // Format the message time to "HH:mm" (24-hour clock format)
  const formattedTime = messageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Access user authentication information from context
  const { authuser } = useAuthContext();
  // Access selected conversation information from state
  const { selectedConversation } = useConversation();

  // Determine if the message is from the current user
  const fromMe = message.senderId === authuser._id;

  // Set CSS class based on message sender (for styling chat bubbles)
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  // Set profile picture based on message sender
  const profilePic = fromMe
    ? authuser.profilepic
    : selectedConversation?.profilepic;

  // Set background color for message bubble based on message sender
  const bubblebgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      {/* Display profile picture */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Profile" />
        </div>
      </div>
      {/* Display message bubble */}
      <div className={`chat-bubble text-white ${bubblebgColor}`}>
        {message.message}
      </div>
      {/* Display message time */}
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;








// import React from "react";
// import { useAuthContext } from "../../context/AuthContext";
// import useConversation from "../../zustand/useConversation";
// function Message({ message }) {
//   // Convert the message time string to a Date object
//   const messageDate = new Date(message.createdAt);
//    // Format the message time to "HH:mm" (24-hour clock format)
//   const formattedTime = messageDate.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });


//   const { authuser } = useAuthContext();
//   const { selectedConversation } = useConversation();
//   const fromMe = message.senderId === authuser._id;
//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const profilePic = fromMe
//     ? authuser.profilepic
//     : selectedConversation?.profilepic;
//   const bubblebgColor = fromMe ? "bg-blue-500" : "";
//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             src={profilePic}
//             alt="chat_bubble_com"
//           />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white ${bubblebgColor}`}>
//         {message.message}
//       </div>
//       <div
//         className={`chat-footer opacity-50 text-xs flex gap-1  items-center`}
//       >
//         {formattedTime}
//       </div>
//     </div>
//   );
// }

// export default Message;
