import { Avatar, Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import SearchInput from "../../input/SearchInput";
import { deepPurple } from "@mui/material/colors";
import { selectUser, userResults } from "../../../store/user/user.reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  fetchWithQuery,
  selectQueryMovie,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import ShowsCard from "../MoviesAllPage/ShowsCard";
import { Link } from "react-router-dom";
import DropDown from "../DropDown/DropDown";

type SearchHeaderProps = {
  displayName?: string;
  photoURL?: string;
  user?: userResults | null;
};

const SearchHeader: FC<SearchHeaderProps> = () => {
  const userData = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const movieWithQuery = useSelector(selectQueryMovie);
  const { results } = movieWithQuery;
  const { user } = userData;
  const displayName = user?.displayName || "Anonim";
  const photoURL = user?.photoURL;
  const [query, setQuery] = useState<string>("");
  const [active, setActive] = useState();
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
          <SearchInput setQuery={setQuery} setActive={setActive}></SearchInput>
          {query.length > 0 ? <DropDown results={results}></DropDown> : null}
        </Box>
        <Box className=" w-[20%] h-[50%] flex justify-center items-center  ">
          <Avatar
            alt={displayName}
            src={photoURL}
            sx={{ width: 50, height: 50, bgcolor: deepPurple[500] }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SearchHeader;
