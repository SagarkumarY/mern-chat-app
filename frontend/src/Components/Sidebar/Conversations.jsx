import React from "react";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import useGetConversation from "../../hooks/useGetConversation";

function Conversations() {
  const { conversation, loading } = useGetConversation();
  //  console.log( conversation)
  return (
    <div className="flex py-2 flex-col overflow-auto">
      {conversation.map((conversations, index) => {
        return (
          <Conversation
            key={conversations._id}
            conversation={conversations}
            emoji={getRandomEmoji()}
            lastIdx={index === conversations.length - 1}
          />
        );
      })}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
