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
import { HomePageContainerProps } from "../../../../store/user/user.reducer";
import { useNavigate } from "react-router";

type MovieCardContainerProps = {
  filteredResults: IClickShowsResult[];
  clickShows: popularMoviesResults;
  details: IClickMovieDetails;
  user: HomePageContainerProps;
};

const MovieCardContainer: FC<MovieCardContainerProps> = ({
  filteredResults,
  clickShows,
  details,
  user,
}) => {
  const navigate = useNavigate();
  console.log("user", user);
  if (Object.keys(user).length === 0) {
    navigate("/");
    return null;
  }
  return (
    <>
      <Box className="w-full h-[85%] box-border">
        <Box className=" w-full h-[50%] rounded-xl overflow-hidden object-contain">
          <ReactPlayers
            url={`https://www.youtube.com/watch?v=${filteredResults[0]?.key}`}
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
