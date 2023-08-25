import React from "react";
import SearchHeader from "../HomePageContainer/SearchHeader/SearchHeader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.reducer";
import { Box } from "@mui/material";

const MoviePageContainer = () => {
  const user = useSelector(selectUser);
  return (
    <Box className="w-full h-full p-5">
      <SearchHeader user={user ? user : null}></SearchHeader>
    </Box>
  );
};

export default MoviePageContainer;
