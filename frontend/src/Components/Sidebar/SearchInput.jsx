import React from "react";
// import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
function SearchInput() {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="search..."
        className="input  input-bordered rounded-full"
      />
      <button type="submit" className="btn  btn-circle bg-sky-500 text-white">
        <IoIosSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
