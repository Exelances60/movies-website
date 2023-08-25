import { Box } from "@mui/material";
import React from "react";
import Card from "../../../Card/Card";
import { useSelector } from "react-redux";
import {
  selectPopularMovie,
  selectPopularTvShows,
  selectUpComingMovie,
} from "../../../../store/movieData/movie.reducer";

const CardContainer = () => {
  const popularMovies = useSelector(selectPopularMovie);
  const upComingMovies = useSelector(selectUpComingMovie);
  const popularTvShows = useSelector(selectPopularTvShows);

  return (
    <>
      <Box className="w-full h-[85%]  overflow-y-scroll flex">
        <Box className="md:w-[100%] xl:w-[85%] w-[100%] h-[100%] ">
          <Card results={popularMovies.results} title={"Popular Movies"} />
          <Card
            results={upComingMovies.results}
            title={"Upcoming Movies"}
          ></Card>
          <Card
            results={popularTvShows.results}
            title={"Popular Tv Shows"}
          ></Card>
        </Box>

        <Box className=" xl:w-[15%] hidden md:flex "></Box>
      </Box>
    </>
  );
};

export default CardContainer;
