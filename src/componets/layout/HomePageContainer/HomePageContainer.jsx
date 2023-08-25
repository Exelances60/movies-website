import { Box } from "@mui/material";
import React from "react";
import SearchHeader from "./SearchHeader/SearchHeader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.reducer";
import CardContainer from "./CardContainer/CardContainer";

const HomePageContainer = () => {
  const userData = useSelector(selectUser);
  const { user } = userData || null;

  return (
    <>
      <Box className="w-full h-full p-5">
        <SearchHeader user={user ? user : null}></SearchHeader>
        <CardContainer></CardContainer>
      </Box>
    </>
  );
};

export default HomePageContainer;
