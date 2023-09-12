import React, { FC } from "react";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import ShowsCard from "../../componets/layout/MoviesAllPage/ShowsCard";
import { useSelector } from "react-redux";
import {
  popularMoviesResults,
  selectPopularMovie,
} from "../../store/movieData/movie.reducer";
import { useNavigate } from "react-router";
import { selectUser } from "../../store/user/user.reducer";
import { useEffect } from "react";

type MovieAllProps = {
  header: string;
  results?: popularMoviesResults;
};

const MoviesAll: FC<MovieAllProps> = () => {
  const popularMovies = useSelector(selectPopularMovie);
  const { results } = popularMovies;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <NavigationBar></NavigationBar>
      <ShowsCard header="Popular Movies" results={results}></ShowsCard>
    </div>
  );
};

export default MoviesAll;
