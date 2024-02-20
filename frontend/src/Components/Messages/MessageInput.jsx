import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
function MessageInput() {
  const { sendMessage, loading } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    // Check if the trimmed message is empty
    if (!trimmedMessage) return;
    await sendMessage(trimmedMessage);
     setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message"
          className="border  text-sm rounded-lg black w-full p-2.5 bg-gray-700 border-gray-500 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className=" absolute  inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
