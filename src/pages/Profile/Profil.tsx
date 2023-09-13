import React, { ChangeEvent, FC, useEffect, useState } from "react";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import { useSelector } from "react-redux";
import {
  selectPhotoURL,
  selectUser,
  setPhotoURL,
  userResults,
} from "../../store/user/user.reducer";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch } from "../../store/store";
import { getUsersWithFirebase, uploadData } from "../../utils/firebase.utils";

type ProfilProps = {
  user: userResults | null;
  photoURLFile: string;
};

const Profil: FC<ProfilProps> = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUser);
  const { user } = userData;
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || "Anonim"
  );
  const photoURL: string = useSelector(selectPhotoURL) as string;
  const [dene, setDene] = useState<string>("");
  useEffect(() => {
    setDene(photoURL);
  }, [photoURL]);
  const handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    } else {
      const url = URL.createObjectURL(e.target.files[0]);

      uploadData("photoUrl", url, user?.uid || "");
    }
  };

  console.log(dene);
  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <NavigationBar></NavigationBar>
      <div className=" w-full h-full p-10 box-border">
        <div className=" w-full h-full flex-col items-center  flex text-white">
          <Avatar
            alt={displayName}
            variant="rounded"
            src={dene}
            sx={{ width: 200, height: 200, bgcolor: deepPurple[500] }}
            className="cursor-pointer"
          />
          <input type="file" className="mt-5" onChange={handleChangePhoto} />
          <h1 className="mt-5">{user?.displayName}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profil;
