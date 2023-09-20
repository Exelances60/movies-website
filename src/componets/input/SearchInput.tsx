import React, { FC, Dispatch, SetStateAction } from "react";

type SearchInputProps = {
  setQuery?: Dispatch<SetStateAction<string>>;
  placeholder: string;
  rounded?: string;
  setUserQuery?: Dispatch<SetStateAction<string>>;
};

const SearchInput: FC<SearchInputProps> = ({
  setQuery,
  placeholder,
  rounded,
  setUserQuery,
}) => {
  return (
    <>
      <input
        type="text"
        className={`w-[100%] h-[7vh] ${rounded} bg-[#212121] border-none outline-none p-5 text-white placeholder-white placeholder-opacity-50`}
        placeholder={placeholder}
        onChange={(e) => {
          if (setQuery) {
            setQuery(e.target.value);
          }
          if (setUserQuery) {
            setUserQuery(e.target.value);
          }
        }}
      ></input>
    </>
  );
};

export default SearchInput;
