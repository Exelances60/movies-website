import React, { FC, useEffect, useState } from "react";
import HomePageContainer from "../../componets/layout/HomePageContainer/HomePageContainer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  selectUser,
  setPhotoURL,
  userResults,
} from "../../store/user/user.reducer";
import {
  fetchUpComingMovies,
  popularTvShows,
} from "../../store/movieData/movie.reducer";
import { useAppDispatch } from "../../store/store";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import { getUsersWithFirebase } from "../../utils/firebase.utils";
import { DocumentData } from "firebase/firestore";

type HomeProps = {
  user: userResults | null;
  photoURL: string;
};
export type Data = DocumentData[];
const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUser);
  const { user } = userData;
  const dispatch = useAppDispatch();
  const [photoURLs, setPhotoURLs] = useState<Data | null>();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (Object.keys(userData).length === 0) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchPhotoURL();
    dispatch(fetchUpComingMovies());
    dispatch(popularTvShows());
  }, [user]);

  const fetchPhotoURL = async () => {
    try {
      const response: Data = (await getUsersWithFirebase(
        user?.uid || ""
      )) as Data;

      dispatch(setPhotoURL(response[0].photoUrl));
    } catch (error) {
      console.error("Error fetching photo URL:", error);
    }
  };
  console.log(photoURLs);
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
