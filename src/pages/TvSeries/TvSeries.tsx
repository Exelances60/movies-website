import React from "react";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import ShowsCard from "../../componets/layout/MoviesAllPage/ShowsCard";
import { useSelector } from "react-redux";
import { selectPopularTvShows } from "../../store/movieData/movie.reducer";
import { useRequireAuth } from "../../utils/checkLogin/checkLogin";
import LongMenu from "../../componets/Menu/Menu";

const TvSeries = () => {
  const popularTvShows = useSelector(selectPopularTvShows);
  const { results } = popularTvShows;

  useRequireAuth();

  return (
    <div>
      <div className="w-full h-[100vh] bg-[#191919] flex">
        <LongMenu></LongMenu>
        <NavigationBar></NavigationBar>
        <ShowsCard header="Popular Movies" results={results}></ShowsCard>
      </div>
    </div>
  );
};

export default TvSeries;
