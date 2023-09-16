import React, { ChangeEvent, FC, useEffect, useState } from "react";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import { useSelector } from "react-redux";
import {
  selectPhotoURL,
  selectUser,
  userResults,
} from "../../store/user/user.reducer";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { getUsersWithFirebase, uploadData } from "../../utils/firebase.utils";
import {
  IClickMovieDetails,
  IClickShowsResult,
} from "../../store/movieData/movie.reducer";
import ProfileWatched from "../../componets/layout/ProfileWatched/ProfileWatched";
import LongMenu from "../../componets/Menu/Menu";
import { useRequireAuth } from "../../utils/checkLogin/checkLogin";

type ProfilProps = {
  user: userResults | null;
  photoURLFile: string;
};

const Profil: FC<ProfilProps> = () => {
  const userData = useSelector(selectUser);
  const { user } = userData;
  useRequireAuth();

  const photoURLFile = useSelector(selectPhotoURL);
  const [dene, setDene] = useState<string>("");
  const [fireBaseUserData, setFireBaseUserData] = useState<
    IClickMovieDetails[]
  >([]);
  useEffect(() => {
    setDene(photoURLFile);
  }, [photoURLFile]);
  const handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);

      reader.onloadend = function (readerEvent: ProgressEvent<FileReader>) {
        if (readerEvent?.target?.result) {
          setDene(readerEvent.target.result as string);
          uploadData(
            "photoUrl",
            readerEvent.target.result as string,
            user?.uid || ""
          );
        }
      };
    }
  };
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUsersWithFirebase(user?.uid || "");

      setFireBaseUserData(data[0].WatchedMovie);
    };
    getUserData();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <LongMenu></LongMenu>

      <NavigationBar></NavigationBar>
      <div className=" w-full h-full p-10 box-border">
        <div className=" w-full h-full flex-col items-center  flex text-white">
          <Avatar
            alt={user?.displayName || "Anonim"}
            variant="rounded"
            src={dene}
            sx={{ width: 200, height: 200, bgcolor: deepPurple[500] }}
            className="cursor-pointer shadow-black shadow-md"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-full mt-5 hover:bg-blue-600 ease-in duration-300 shadow-xl"
          >
            Upload a File
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleChangePhoto}
          ></input>

          <h1 className="mt-5">{user?.displayName}</h1>
          <ProfileWatched fireBaseUserData={fireBaseUserData}></ProfileWatched>
        </div>
      </div>
    </div>
  );
};

export default Profil;
