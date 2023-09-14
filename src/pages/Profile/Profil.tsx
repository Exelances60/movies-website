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
import { uploadData } from "../../utils/firebase.utils";

type ProfilProps = {
  user: userResults | null;
  photoURLFile: string;
};

const Profil: FC<ProfilProps> = () => {
  const userData = useSelector(selectUser);
  const { user } = userData;
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || "Anonim"
  );

  const photoURLFile = useSelector(selectPhotoURL);
  const [dene, setDene] = useState("");
  useEffect(() => {
    setDene(photoURLFile);
  }, [photoURLFile]);
  const handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Select a file");
      return;
    } else {
      var file = e.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

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
