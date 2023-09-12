import React, { FC, Dispatch, SetStateAction } from "react";

type SearchInputProps = {
  setQuery: Dispatch<SetStateAction<string>>;
  setActive: Dispatch<SetStateAction<any>>;
};

const SearchInput: FC<SearchInputProps> = ({ setQuery, setActive }) => {
  return (
    <>
      <input
        type="text"
        className="w-[100%] h-[7vh] rounded-full bg-[#212121] border-none outline-none p-5 text-white placeholder-white placeholder-opacity-50"
        placeholder="🎬 Search for a movie, tv show..."
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setActive(true)}
        onBlur={() => setActive(false)}
      ></input>
    </>
  );
};

export default SearchInput;
