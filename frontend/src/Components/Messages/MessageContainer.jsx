// import React from "react";
// import Messages from "./Messages";
// import MessageInput from "./MessageInput";
// import { TiMessages } from "react-icons/ti";
// function MessageContainer() {
//   const noChatSelected = true;
//   return (
//     <div className=" md:min-w-[450px] flex flex-col">
//       {noChatSelected ? (
//         <noChatSelected />
//       ) : (
//         <>
//           {/* Header */}
//           <div className=" bg-slate-500  px-4 py-2 mb-2">
//             <span className="label-text">To:</span>
//             <span className=" text-gray-900 font-bold">Madara</span>
//           </div>
//           <Messages />

//           <MessageInput />
//         </>
//       )}
//     </div>
//   );
// }

// export default MessageContainer;

// const noChatSelected = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
//         <p>Welcome ✋ Madara uchia</p>
//         <p>Select a chat to start messaging</p>
//         <TiMessages className="text-3xl md:text-6xl text-center" />
//       </div>
//     </div>
//   );
// };

import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  // const noChatSelected = true; // You may want to change this to a state or prop to dynamically control the rendering
  const { seletedConversation, setSeletedConversation } = useConversation();

  useEffect(() => {
    // cleanup functon {unmount}
    return () => setSeletedConversation(null);
  }, [setSeletedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!seletedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">
              {seletedConversation.fullname}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

// Define the NoChatSelected component
function NoChatSelected() {

  const {authuser} = useAuthContext()
  // let nameString = localStorage.getItem("chat-user"); // Retrieve the string from localStorage
  // Parse the string into a JavaScript object
  // let name = JSON.parse(nameString);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome ✋ {authuser.fullname}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}

export default MessageContainer;
