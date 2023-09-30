import React, { FC } from "react";
import { useAppDispatch } from "../../../store/store";
import {
  IClickMovieDetails,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { uploadDataSuggestion } from "../../../utils/firebase.utils";
import { filteredUsers } from "../HomePageContainer/SearchHeader";

type ProfileWatchedProps = {
  fireBaseUserData: IClickMovieDetails[];
  send?: boolean;
  filteredUsers?: filteredUsers[];
};

const ProfileWatched: FC<ProfileWatchedProps> = ({
  fireBaseUserData,
  filteredUsers,
  send,
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className=" w-full h-[100%] p-5 box-border overflow-y-auto">
        {fireBaseUserData?.map((item, i) => {
          return (
            <div className="w-full h-[20%] mt-5 flex" key={i}>
              <div className="w-[15%] h-full ">
                <Link to={`/Movie/${item.original_title}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt=""
                    className="w-full h-full xl:object-contain object-cover cursor-pointer rounded-md hover:brightness-110 transition duration-300 ease-in shadow-2xl"
                    onClick={() => {
                      dispatch(setClickShows(item));
                    }}
                    data-testid="movieImage"
                  ></img>
                </Link>
              </div>
              <div className="ml-2">
                <h1 className="text-white">
                  {item.original_title || item.name}
                </h1>
                <h1 className="text-white">{item.release_date}</h1>
                <h1 className="text-white">{item.vote_average}</h1>
                <h1 className="text-white">
                  User Comment :{" "}
                  {item.comment === undefined ? "Yorum Yok" : item.comment}
                </h1>
              </div>
              {send ? (
                <Button
                  variant="contained"
                  className="h-[5vh] ml-2"
                  onClick={() => {
                    if (filteredUsers !== undefined) {
                      uploadDataSuggestion(
                        "suggestions",
                        item,
                        filteredUsers[0].uid,
                        400
                      );
                    }
                  }}
                >
                  Öner
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileWatched;
