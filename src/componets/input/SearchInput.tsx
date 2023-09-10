import React from "react";

const SearchInput = () => {
  return (
    <>
      <input
        type="text"
        className="w-[100%] h-[7vh] rounded-full bg-[#212121] border-none outline-none p-5 text-white placeholder-white placeholder-opacity-50"
        placeholder="🎬 Search for a movie, tv show..."
      ></input>
    </>
  );
};

export default SearchInput;
