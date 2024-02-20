import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setSearch] = useState(""); // Renamed setsearch to setSearch for consistency
  const { setSeletedConversation } = useConversation();
  const { conversation } = useGetConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = search.trim();
    
    // Check if search input is empty or too short
    if (trimmedMessage.length < 3) {
      return toast.error("Please enter at least 3 characters");
      
    }

    // Search for conversations based on input
    const foundConversation = conversation.find((c) =>
      c.fullname.toLowerCase().includes(trimmedMessage.toLowerCase())
    );

    if (foundConversation) {
      // If conversation is found, set it as selected and clear search input
      setSeletedConversation(foundConversation);
      setSearch("");
    } else {
      toast.error("No such user found !");
      setSearch("");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Use setSearch to update search state
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoIosSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;




















/////////// Review  code 

// import React, { useState } from "react";
// // import { FaSearch } from "react-icons/fa";
// import { IoIosSearch } from "react-icons/io";
// import useConversation from "../../zustand/useConversation";
// import useGetConversation from "../../hooks/useGetConversation";
// import toast from "react-hot-toast";
// function SearchInput() {
//   const [search, setsearch] = useState("");
//   const { setSeletedConversation } = useConversation();
//   const { conversation } = useGetConversation();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const trimmedMessage = search.trim();
//     if (!trimmedMessage) return;
//     if (trimmedMessage.length < 3) {
//       return toast.error("Please enter at least 3 characters");
//     }
//     const conversations = conversation.find((c) =>
//       c.fullname.toLowerCase().includes(search.toLocaleLowerCase())
//     );

//     if (conversations) {
//       setSeletedConversation(conversations);
//       setsearch("");
//     } else toast.error("No such user found !");
//   };
//   return (
//     <form className="flex items-center gap-2" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="search..."
//         className="input  input-bordered rounded-full"
//         value={search}
//         onChange={(e) => setsearch(e.target.value)}
//       />
//       <button type="submit" className="btn  btn-circle bg-sky-500 text-white">
//         <IoIosSearch className="w-6 h-6 outline-none" />
//       </button>
//     </form>
//   );
// }

// export default SearchInput;

