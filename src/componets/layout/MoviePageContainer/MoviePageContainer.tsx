import React, { useEffect, useState } from "react";
import SearchHeader from "../HomePageContainer/SearchHeader/SearchHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.reducer";
import { Box, CircularProgress } from "@mui/material";
import { checkLogin } from "../../../utils/checkLogin/checkLogin";
import { useNavigate } from "react-router";
import {
  IpopularMovies,
  clickMoviesDetails,
  fetchMovieVideos,
  selectClickMoviesDetails,
  selectClickShows,
  selectClickShowsVideos,
} from "../../../store/movieData/movie.reducer";
import MovieCardContainer from "./MovieCardContainer/MovieCardContainer";

const MoviePageContainer = (): IpopularMovies => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const clickShows = useSelector(selectClickShows);
  const clickShowsVideos = useSelector(selectClickShowsVideos);
  const { results } = clickShowsVideos;
  const [filteredResults, setFilteredResults] = useState([]);
  const details = useSelector(selectClickMoviesDetails) || null;

  useEffect(() => {
    checkLogin(user, navigate);
    dispatch(fetchMovieVideos(clickShows.id));
    dispatch(clickMoviesDetails(clickShows.id));
  }, [user, clickShows]);
  useEffect(() => {
    if (results) {
      const FilteredResults = results.filter((result) => {
        return result.type === "Trailer";
      });
      setFilteredResults(FilteredResults);
    }
  }, [results]);

  return (
    <Box className="w-full h-full p-5">
      <SearchHeader user={user ? user : null}></SearchHeader>
      <MovieCardContainer
        clickShows={clickShows}
        details={details || null}
        filteredResults={filteredResults}
      ></MovieCardContainer>
    </Box>
  );
};

export default MoviePageContainer;
