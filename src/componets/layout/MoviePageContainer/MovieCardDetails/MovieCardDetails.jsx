import { Box, Typography } from "@mui/material";
import React from "react";

const MovieCardDetails = ({ clickShows, details }) => {
  return (
    <>
      <Box className=" w-full  text-white md:flex ">
        <Box className="w-[100%] h-full   box-border p-5 ">
          <Box className="w-full h-[100%]   flex flex-col">
            <Typography
              variant="h8"
              fontFamily={"sans-serif"}
              fontWeight={"bold"}
            >
              <p className="text-red-400">{clickShows.title}</p>{" "}
              {clickShows.release_date.slice(0, 4)} -{" "}
              {clickShows.original_language.toUpperCase()}
              {details.genres
                ? details.genres.map((genre) => {
                    return <span> - {genre.name} </span>;
                  })
                : null}
            </Typography>
            <Typography
              variant="p"
              sx={{ marginTop: "15px" }}
              fontFamily={"sans-serif"}
            >
              {details.overview}
            </Typography>
          </Box>
          <Box className="w-full h-[13vh]"></Box>
        </Box>
        <Box className="w-[30%] h-full  box-border p-5">asd</Box>
      </Box>
    </>
  );
};

export default MovieCardDetails;