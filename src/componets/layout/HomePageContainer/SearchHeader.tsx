import { Avatar, Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import SearchInput from "../../input/SearchInput";
import { deepPurple } from "@mui/material/colors";
import {
  selectPhotoURL,
  selectUser,
  userResults,
} from "../../../store/user/user.reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  fetchWithQuery,
  selectQueryMovie,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import { Link } from "react-router-dom";
import DropDown from "../DropDown/DropDown";

type SearchHeaderProps = {
  user?: userResults | null;
};

const SearchHeader: FC<SearchHeaderProps> = () => {
  const dispatch = useAppDispatch();
  const movieWithQuery = useSelector(selectQueryMovie);
  const { results } = movieWithQuery;
  const [query, setQuery] = useState<string>("");
  const photoURLFile = useSelector(selectPhotoURL);

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchWithQuery(query));
    } else {
      dispatch(fetchWithQuery(""));
    }
  }, [query]);

  return (
    <>
      <Box className=" w-full h-[15%] flex  justify-between items-center">
        <Box className="xl:w-[70%] w-[80%] ">
          <SearchInput setQuery={setQuery}></SearchInput>
          {query.length > 0 ? <DropDown results={results}></DropDown> : null}
        </Box>
        <Box className=" w-[20%] h-[50%] flex justify-center items-center  ">
          <Link to="/profile">
            <Avatar
              src={photoURLFile}
              sx={{ width: 50, height: 50, bgcolor: deepPurple[500] }}
            />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default SearchHeader;
