import { useEffect, useState } from "react";
import SearchHeader from "../HomePageContainer/SearchHeader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.reducer";
import { Box } from "@mui/material";
import { checkLogin } from "../../../utils/checkLogin/checkLogin";
import { useNavigate } from "react-router";
import {
  IClickShowsResult,
  clickMoviesDetails,
  fetchMovieVideos,
  popularMoviesResults,
  selectClickMoviesDetails,
  selectClickShows,
  selectClickShowsVideos,
} from "../../../store/movieData/movie.reducer";
import MovieCardContainer from "./MovieCardContainer/MovieCardContainer";
import { useAppDispatch } from "../../../store/store";

type ClickShowsForTv = popularMoviesResults & { first_air_date: string };

const MoviePageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const clickShows: ClickShowsForTv = useSelector(
    selectClickShows
  ) as ClickShowsForTv;
  const clickShowsVideos = useSelector(selectClickShowsVideos);
  const { results } = clickShowsVideos;
  const [filteredResults, setFilteredResults] = useState<IClickShowsResult[]>(
    []
  );
  const details = useSelector(selectClickMoviesDetails) || null;

  useEffect(() => {
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
      <SearchHeader></SearchHeader>
      <MovieCardContainer
        clickShows={clickShows}
        user={user}
        details={details || null}
        filteredResults={filteredResults}
      ></MovieCardContainer>
    </Box>
  );
};

export default MoviePageContainer;
