import React, { useEffect } from "react";
import HomePageContainer from "../../componets/layout/HomePageContainer/HomePageContainer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.reducer";
import {
  fetchUpComingMovies,
  popularTvShows,
} from "../../store/movieData/movie.reducer";
import { useAppDispatch } from "../../store/store";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
    dispatch(fetchUpComingMovies());
    dispatch(popularTvShows());
  }, [user]);

  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <div className="w-full h-[100vh] bg-[#191919] flex">
        <NavigationBar></NavigationBar>
        <HomePageContainer></HomePageContainer>
      </div>
    </div>
  );
};

export default Home;
