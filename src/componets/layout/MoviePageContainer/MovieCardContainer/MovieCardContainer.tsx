import { Box, Typography } from "@mui/material";
import React from "react";
import ReactPlayers from "../../../input/ReactPlayer";
import {
  IClickMovieDetails,
  IClickShowsResult,
  popularMoviesResults,
} from "../../../../store/movieData/movie.reducer";
import { FC } from "react";
import MovieCardDetails from "../MovieCardDetails/MovieCardDetails";

type MovieCardContainerProps = {
  filteredResults: IClickShowsResult[];
  clickShows: popularMoviesResults;
  details: IClickMovieDetails;
};

const MovieCardContainer: FC<MovieCardContainerProps> = ({
  filteredResults,
  clickShows,
  details,
}) => {
  if (filteredResults.length === 0)
    return (
      <Box className="w-full h-[85%] box-border flex justify-center items-center"></Box>
    );

  console.log("filteredResults", filteredResults);
  console.log("clickShows", clickShows);
  console.log("details", details);
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
