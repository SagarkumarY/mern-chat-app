import React from "react";

function Conversation() {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatat online ">
          <div className="w-12 rounded-full">
            <img
            //   src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/female_woman_avatar_portrait-512.png"
            src="https://cdn2.iconfinder.com/data/icons/emoji-line/32/emoji_20-512.png"
              alt="user_avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="font-bold  text-gray-200">Madara</p>
            <span className="text-xl">😎</span>
          </div>
        </div>
      </div>
      <div className=" divider  my-0 py-0 h-1" />
    </>
  );
}

export default Conversation;
