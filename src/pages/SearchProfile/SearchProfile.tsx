import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import LongMenu from "../../componets/Menu/Menu";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import { Avatar } from "@mui/material";
import ProfileWatched from "../../componets/layout/ProfileWatched/ProfileWatched";
import { getUsersWithFirebase } from "../../utils/firebase.utils";
import { IClickMovieDetails } from "../../store/movieData/movie.reducer";
import { userResults } from "../../store/user/user.reducer";
import { DocumentData } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

const SearchProfile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState<userResults | DocumentData>([{}]);
  const [fireBaseUserData, setFireBaseUserData] = useState<
    IClickMovieDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUsersWithFirebase(uid || "");
      await setUser(data[0]);
      await setFireBaseUserData(data[0].WatchedMovie);
      setLoading(true);
    };
    getUserData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full h-[100vh] bg-[#191919] flex">
          <LongMenu></LongMenu>
          <NavigationBar></NavigationBar>
          <div className=" w-full h-full p-10 box-border">
            <div className=" w-full h-full flex-col items-center  flex text-white">
              <Avatar
                variant="rounded"
                alt={user.name || "Anonim"}
                src={user.photoUrl}
                sx={{ width: 200, height: 200 }}
                className="cursor-pointer shadow-black shadow-md"
              />

              <h1 className="mt-5">{user.name}</h1>
              <ProfileWatched
                fireBaseUserData={fireBaseUserData}
              ></ProfileWatched>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] bg-[#191919] flex items-center justify-center">
          <CircularProgress color="success"></CircularProgress>
        </div>
      )}
    </>
  );
};

export default SearchProfile;
