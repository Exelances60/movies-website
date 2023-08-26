import { Box, Typography } from "@mui/material";
import React from "react";
import ReactPlayers from "../../../input/ReactPlayer";
import MovieCardDetails from "../MovieCardDetails/MovieCardDetails";
const MovieCardContainer = ({ filteredResults, clickShows, details }) => {
  if (filteredResults.length === 0)
    return (
      <Box className="w-full h-[85%] box-border flex justify-center items-center"></Box>
    );
  return (
    <>
      <Box className="w-full h-[85%] box-border">
        <Box className=" w-full h-[50%] rounded-xl overflow-hidden object-contain">
          <ReactPlayers
            url={`https://www.youtube.com/watch?v=${filteredResults[0].key}`}
          ></ReactPlayers>
        </Box>
        <MovieCardDetails
          clickShows={clickShows}
          details={details}
        ></MovieCardDetails>
      </Box>
    </>
  );
};

export default MovieCardContainer;
