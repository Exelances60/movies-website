import React, { FC } from "react";

import { useAppDispatch } from "../../../store/store";
import {
  IClickMovieDetails,
  IClickShowsResult,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import { Link } from "react-router-dom";

type ProfileWatchedProps = {
  fireBaseUserData: IClickMovieDetails[];
};

const ProfileWatched: FC<ProfileWatchedProps> = ({ fireBaseUserData }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className=" w-full h-[100%] p-5 box-border overflow-y-auto">
        {fireBaseUserData?.map((item) => {
          return (
            <div className="w-full h-[20%] mt-5 flex">
              <div className="w-[15%] h-full ">
                <Link to={`/Movie/${item.original_title}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt=""
                    className="w-full h-full xl:object-contain object-cover cursor-pointer rounded-md hover:brightness-110 transition duration-300 ease-in shadow-2xl"
                    onClick={() => {
                      dispatch(setClickShows(item));
                    }}
                  ></img>
                </Link>
              </div>
              <div className="ml-2">
                <h1 className="text-white">
                  {item.original_title || item.name}
                </h1>
                <h1 className="text-white">{item.release_date}</h1>
                <h1 className="text-white">{item.vote_average}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileWatched;
