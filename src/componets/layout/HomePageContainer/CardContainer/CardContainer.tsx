import { Box } from "@mui/material";
import Card from "../../../Card/Card";
import { useSelector } from "react-redux";
import {
  selectPopularMovie,
  selectPopularTvShows,
  selectUpComingMovie,
} from "../../../../store/movieData/movie.reducer";
import { useAppSelector } from "../../../../store/store";
import { Link } from "react-router-dom";

const CardContainer = () => {
  const popularMovies = useAppSelector((state) => state.movie.popularMovies);
  const upComingMovies = useSelector(selectUpComingMovie);
  const popularTvShows = useSelector(selectPopularTvShows);

  return (
    <>
      <Box className="w-full h-[85%]  overflow-y-scroll flex">
        <Box className="md:w-[100%] xl:w-[85%] w-[100%] h-[100%] ">
          <Link to="/moviesAll">
            <Card
              amount={5}
              results={popularMovies.results}
              title={"Popular Movies"}
            />
          </Link>

          <Card
            amount={5}
            results={upComingMovies.results}
            title={"Upcoming Movies"}
          ></Card>

          <Link to="/tvSeries">
            <Card
              amount={5}
              results={popularTvShows.results}
              title={"Popular Tv Shows"}
            ></Card>
          </Link>
        </Box>

        <Box className=" xl:w-[15%] hidden md:flex "></Box>
      </Box>
    </>
  );
};

export default CardContainer;
