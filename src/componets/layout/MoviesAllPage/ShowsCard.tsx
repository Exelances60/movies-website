import React from "react";
import { Box, Typography } from "@mui/material";
import SearchHeader from "../HomePageContainer/SearchHeader";
import { FC } from "react";
import {
  popularMoviesResults,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";

type ShowsCardProps = {
  header?: string;
  results: popularMoviesResults[];
  flex?: string;
};

const ShowsCard: FC<ShowsCardProps> = ({ header, results, flex }) => {
  const dispatch = useAppDispatch();
  return (
    <Box className="w-full h-full p-5">
      <SearchHeader></SearchHeader>
      <Box className="w-full h-[85%]">
        <Typography variant="h4" className="text-white">
          {header}
        </Typography>
        <Box
          className={`w-[90%] h-[80%] flex flex-wrap ${flex}  justify-evenly`}
        >
          {results &&
            results.map((results) => {
              return (
                <Box
                  key={results.id}
                  className=" xl:w-[15%]  xl:h-[50%] md:w-[25%] w-[19.5%]  md:mr-2 mb-5 "
                >
                  <Box className="w-full h-full ">
                    <Link to={`/Movie/${results.original_title}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${results.poster_path}`}
                        alt=""
                        className="w-full h-full rounded-lg md:rounded-3xl object-cover cursor-pointer hover:brightness-110  hover:scale-105 transition duration-300 ease-in shadow-2xl"
                        onClick={() => {
                          dispatch(setClickShows(results));
                        }}
                      ></img>
                    </Link>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default ShowsCard;
