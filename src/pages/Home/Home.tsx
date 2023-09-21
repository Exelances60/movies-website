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
  popularMoviesResults,
  popularTvShows,
} from "../../store/movieData/movie.reducer";
import { useAppDispatch } from "../../store/store";
import NavigationBar from "../../componets/layout/NavigationBar/NavigationBar";
import {
  getUsersWithFirebase,
  uploadDataSuggestion,
} from "../../utils/firebase.utils";
import { DocumentData } from "firebase/firestore";
import LongMenu from "../../componets/Menu/Menu";
import { filteredUsers } from "../../componets/layout/HomePageContainer/SearchHeader";
import { Dialog } from "@mui/material";
import { selectDialog, setDialog } from "../../store/dialog/dialog.reducer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

type HomeProps = {
  user: userResults | null;
  photoURL: string;
};
export type Data = DocumentData[];
const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useSelector(selectUser);
  const { user } = userData;
  const [open, setOpen] = useState(false);
  const options = useSelector(selectDialog);
  const [firebaseUserData, setFirebaseUserData] = useState<
    filteredUsers[] | DocumentData[]
  >([]);
  const fetchPhotoURL = async () => {
    try {
      const response: Data = (await getUsersWithFirebase(
        user?.uid || ""
      )) as Data;
      setFirebaseUserData(response);
      dispatch(setPhotoURL(response[0].photoUrl));
    } catch (error) {
      console.error("Error fetching photo URL:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    console.log("succses");
    return uploadDataSuggestion("suggestions", {}, user?.uid || "", 200);
  };
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

  useEffect(() => {
    if (firebaseUserData.length > 0) {
      const firstUserData = firebaseUserData[0];
      if (firstUserData?.suggestions?.code === 400) {
        dispatch(
          setDialog({
            children: (
              <>
                <div className="bg-[#191919] w-[600px] h-[40vh] flex flex-col items-center text-white overflow-y-auto">
                  <Typography className="text-white" variant="h5">
                    Tavsiye Edilen Bir Film Var
                  </Typography>
                  <div className="text-center">
                    <img
                      className="w-[200px] h-[300px]"
                      src={`https://image.tmdb.org/t/p/original/${firstUserData.suggestions.data?.poster_path}`}
                      alt=""
                    />

                    {firstUserData.suggestions.data?.title}
                  </div>
                </div>
              </>
            ),
          })
        );
        setOpen(true);
      }
    }
  }, [firebaseUserData]);

  return (
    <div className="w-full h-[100vh] bg-[#191919] flex">
      <div className="w-full h-[100vh] bg-[#191919] flex">
        <LongMenu></LongMenu>
        <NavigationBar></NavigationBar>
        <HomePageContainer></HomePageContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          {...options}
        ></Dialog>
      </div>
    </div>
  );
};

export default Home;
