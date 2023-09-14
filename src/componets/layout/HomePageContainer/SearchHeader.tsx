import { Avatar, Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import SearchInput from "../../input/SearchInput";
import { deepPurple } from "@mui/material/colors";
import {
  selectPhotoURL,
  selectUser,
  setUser,
  userResults,
} from "../../../store/user/user.reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  fetchWithQuery,
  selectQueryMovie,
  setClickShows,
} from "../../../store/movieData/movie.reducer";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Person2Icon from "@mui/icons-material/Person2";
import { signOutUser } from "../../../utils/firebase.utils";

type SearchHeaderProps = {
  user?: userResults | null;
};

const SearchHeader: FC<SearchHeaderProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOutUser();
    dispatch(setUser({}));
    navigate("/");
  };

  return (
    <>
      <Box className=" w-full h-[15%] flex  justify-between items-center">
        <Box className="xl:w-[70%] w-[80%] ">
          <SearchInput setQuery={setQuery}></SearchInput>
          {query.length > 0 ? <DropDown results={results}></DropDown> : null}
        </Box>
        <Box className=" w-[20%] h-[50%] flex justify-center items-center  ">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              borderRadius: "100px",
              width: "5%",
              height: "50px",
            }}
          >
            <Avatar
              src={photoURLFile}
              sx={{ width: 50, height: 50, bgcolor: deepPurple[500] }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to="/profile">
              <MenuItem onClick={handleClose}>
                Profile <Person2Icon></Person2Icon>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default SearchHeader;
