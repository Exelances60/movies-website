import React from "react";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import ShowsCard from "../../componets/layout/MoviesAllPage/ShowsCard";
import { useSelector } from "react-redux";
import { selectPopularMovie } from "../../store/movieData/movie.reducer";
import { useNavigate } from "react-router";
import { selectUser } from "../../store/user/user.reducer";
import { useEffect } from "react";
import { useRequireAuth } from "../../utils/checkLogin/checkLogin";

const MoviesAll = () => {
  const popularMovies = useSelector(selectPopularMovie);
  const { results } = popularMovies;

  useRequireAuth();

  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <NavigationBar></NavigationBar>
      <ShowsCard header="Popular Movies" results={results}></ShowsCard>
    </div>
  );
};

export default MoviesAll;
