import React from "react";
import { useParams } from "react-router";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import MoviePageContainer from "../../componets/layout/MoviePageContainer/MoviePageContainer";

const Movie = () => {
  let { id } = useParams();
  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <NavigationBar></NavigationBar>
      <MoviePageContainer></MoviePageContainer>
    </div>
  );
};

export default Movie;
