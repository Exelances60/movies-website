import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  IClickMovieDetails,
  popularMoviesResults,
} from "../../../../store/movieData/movie.reducer";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/user/user.reducer";
import { uploadData } from "../../../../utils/firebase.utils";

type clickShowsProps = popularMoviesResults & { first_air_date: string };

type MovieCardDetailsProps = {
  clickShows: clickShowsProps;
  details: IClickMovieDetails;
};

const MovieCardDetails: FC<MovieCardDetailsProps> = ({
  clickShows,
  details,
}) => {
  const userData = useSelector(selectUser);
  const { user } = userData;
  const [comment, setComment] = useState<string | null>("");
  const [dene, setDene] = useState<clickShowsProps | {}>([{}]);

  return (
    <>
      <Box className=" w-full  text-white md:flex ">
        <Box className="w-[100%] h-full   box-border p-5 ">
          <Box className="w-full h-[100%]   flex flex-col">
            <Typography
              variant="h6"
              fontFamily={"sans-serif"}
              fontWeight={"bold"}
            >
              <p className="text-red-400">{clickShows.title}</p>{" "}
              {clickShows.release_date === undefined
                ? clickShows.first_air_date?.slice(0, 4)
                : clickShows.release_date.slice(0, 4)}{" "}
              - {clickShows.original_language.toUpperCase()}
              {details.genres
                ? details.genres.map((genre) => {
                    return <span> - {genre.name} </span>;
                  })
                : null}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "15px" }}
              fontFamily={"sans-serif"}
            >
              {details.overview}
            </Typography>
            <Button
              variant="contained"
              className="w-[50%] "
              sx={{
                backgroundColor: "#212121",
                ":hover": { backgroundColor: "#4b4b4b" },
              }}
              onClick={() => {
                uploadData("WatchedMovie", dene, user?.uid || "", true);
              }}
            >
              Ekle
            </Button>
          </Box>
          <Box className="w-full h-[10vh]"></Box>
        </Box>
        <Box className="w-[30%] h-full  box-border p-5">
          {details.tagline}
          <TextareaAutosize
            className="w-full h-[30vh] text-black"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></TextareaAutosize>
          <Button
            variant="contained"
            onClick={() => {
              const updateClickShows = {
                ...clickShows,
                comment: comment,
              } as clickShowsProps;
              setDene(updateClickShows);
            }}
          >
            Yorumu Ekle
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MovieCardDetails;
