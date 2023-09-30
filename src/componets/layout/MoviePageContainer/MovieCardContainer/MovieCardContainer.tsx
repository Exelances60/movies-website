import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayers from "../../../input/ReactPlayer";
import {
  IClickMovieDetails,
  IClickShowsResult,
  popularMoviesResults,
} from "../../../../store/movieData/movie.reducer";
import { FC } from "react";
import MovieCardDetails from "../MovieCardDetails/MovieCardDetails";
import { HomePageContainerProps } from "../../../../store/user/user.reducer";
import { useRequireAuth } from "../../../../utils/checkLogin/checkLogin";
type MovieCardContainerProps = {
  filteredResults: IClickShowsResult[];
  clickShows: popularMoviesResults & { first_air_date: string };
  details: IClickMovieDetails;
  user: HomePageContainerProps;
};

const MovieCardContainer: FC<MovieCardContainerProps> = ({
  filteredResults,
  clickShows,
  details,
}) => {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    if (filteredResults.length > 0) {
      setUrl(`https://www.youtube.com/watch?v=${filteredResults[0]?.key}`);
    } else {
      setTimeout(() => {
        setUrl("https://www.youtube.com/watch?v=h7jOAmLEzS0");
      }, 1000);
    }
  }, [url, filteredResults]);
  return (
    <>
      <Box className="w-full  h-[85%] box-border">
        <Box className=" w-full h-[50%] rounded-xl overflow-hidden object-contain">
          <ReactPlayers url={url}></ReactPlayers>
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
