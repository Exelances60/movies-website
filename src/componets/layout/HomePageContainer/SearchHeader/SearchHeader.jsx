import { Avatar, Box } from "@mui/material";
import React from "react";
import SearchInput from "../../../input/SearchInput";
import { deepPurple } from "@mui/material/colors";

const SearchHeader = ({ user }) => {
  return (
    <>
      <Box className=" w-full h-[15%] flex  justify-between items-center">
        <Box className="w-[70%] ">
          <SearchInput></SearchInput>
        </Box>
        <Box className=" w-[20%] h-[50%] flex justify-center items-center  ">
          <Avatar
            {...(user === null
              ? null
              : { alt: user.displayName || "Anonim", src: user.photoURL })}
            sx={{ width: 50, height: 50, bgcolor: deepPurple[500] }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SearchHeader;
