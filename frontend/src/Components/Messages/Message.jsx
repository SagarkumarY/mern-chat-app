import React from "react";

function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
            <img src="https://cdn3.iconfinder.com/data/icons/ninja-filloutline/64/user-ninja-assasin-japan-japanese-spy-spy_man-512.png" alt="chat_bubble_com" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi! what is Upp?</div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1  items-center`}>12:10</div>
    </div>
  );
}

export default Message;
