import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setClickShows } from "../../store/movieData/movie.reducer";
import { Link } from "react-router-dom";

const Card = ({ results, title, amount }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <Typography
          variant="h5"
          gutterBottom
          className="text-white xl:pl-10 box-border pt-2"
        >
          {title}
        </Typography>
        <div className=" w-full h-[40%]  box-border flex justify-around items-center ">
          {results
            ? results.map((results, i) => {
                if (i < amount) {
                  return (
                    <Box
                      key={results.id}
                      className=" xl:w-[15%]  xl:h-full md:w-[25%] w-[19.5%]  md:mr-2  "
                    >
                      <Box className="w-full h-full ">
                        <Link to={`/Movie/${results.original_title}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/original/${results.poster_path}`}
                            alt=""
                            className="w-full h-full rounded-lg md:rounded-3xl object-contain cursor-pointer hover:brightness-110  hover:scale-105 transition duration-300 ease-in shadow-2xl"
                            onClick={() => {
                              dispatch(setClickShows(results));
                            }}
                          ></img>
                        </Link>
                      </Box>
                    </Box>
                  );
                }
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Card;
