import { Box } from "@mui/material";
import React, { FC } from "react";
import {
  IClickMovieDetails,
  popularMoviesResults,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
type DropDownProps = {
  results: popularMoviesResults[] | IClickMovieDetails[];
};

const DropDown: FC<DropDownProps> = ({ results }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Box
        sx={{
          animationName: "wave",
          animationDuration: "3s",
        }}
        className={` absolute w-[58%] m-1 ml-2 overflow-x-auto flex-col p-2 box-border flex flex-wrap bg-[#212121] h-[50%] z-10 ease-in duration-300`}
      >
        <Box className="w-full h-full">
          {results && results.length > 0
            ? results.map((val, i) => (
                <div
                  key={i}
                  className="w-full h-[15%]  mb-2 flex items-center text-white"
                >
                  <div className="w-[15%] p-1 h-full">
                    <Link to={`/Movie/${val.original_title}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${val.poster_path}`}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer rounded-md hover:brightness-110   transition duration-300 ease-in shadow-2xl"
                        onClick={() => {
                          dispatch(setClickShows(val));
                        }}
                      ></img>
                    </Link>
                  </div>
                  <div
                    className="cursor-pointer hover:text-[#f9a825] transition flex flex-col duration-200 ease-in"
                    onClick={() => {
                      dispatch(setClickShows(val));
                    }}
                  >
                    <Link to={`/Movie/${val.original_title}`}>{val.title}</Link>
                    <div> {val.release_date.slice(0, 4)} </div>
                  </div>
                </div>
              ))
            : null}
        </Box>
      </Box>
    </>
  );
};

export default DropDown;
