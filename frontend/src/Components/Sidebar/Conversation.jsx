import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContect";
function Conversation({ conversation, lastIdx, emoji }) {
  const { seletedConversation, setSeletedConversation } = useConversation();

  const isSelected = seletedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();

  const  isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? " bg-sky-500" : " "}
      `}
        onClick={()=>setSeletedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" :"offline"}`}>
          <div className="w-12 rounded-full">
            <img
              // src="https://cdn2.iconfinder.com/data/icons/emoji-line/32/emoji_20-512.png"
              src={conversation.profilepic}
              alt="user_avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="font-bold  text-gray-200">{conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className=" divider  my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
