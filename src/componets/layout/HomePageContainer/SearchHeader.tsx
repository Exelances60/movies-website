import { Box, Button, Dialog } from "@mui/material";
import { FC, useEffect, useState } from "react";
import SearchInput from "../../input/SearchInput";
import { selectUser, userResults } from "../../../store/user/user.reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/store";
import {
  IClickMovieDetails,
  fetchWithQuery,
  popularMoviesResults,
  selectQueryMovie,
  suggestionsType,
} from "../../../store/movieData/movie.reducer";
import DropDown from "../DropDown/DropDown";
import AvatarComponet from "../../Avatar/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { selectDialog, setDialog } from "../../../store/dialog/dialog.reducer";
import {
  getAllUserWithFirebase,
  getUsersWithFirebase,
} from "../../../utils/firebase.utils";
import UserSearch from "../UserSearch/UserSearch";
import { DocumentData } from "firebase/firestore";

export type filteredUsers =
  | {
      name: string;
      photoUrl: string;
      uid: string;
      WatchedMovie?: popularMoviesResults[];
      suggestions?: suggestionsType[];
    }
  | DocumentData;
type SearchHeaderProps = {
  user?: userResults | null;
};

const SearchHeader: FC<SearchHeaderProps> = () => {
  const dispatch = useAppDispatch();
  const movieWithQuery = useSelector(selectQueryMovie);
  const { results } = movieWithQuery;
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const options = useSelector(selectDialog);
  const [userQuery, setUserQuery] = useState<string>("");
  const userData = useSelector(selectUser);
  const { user } = userData;
  const [fireBaseUserData, setFireBaseUserData] = useState<
    IClickMovieDetails[]
  >([]);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUsersWithFirebase(user?.uid || "");

      if (data && data.length > 0 && data[0].hasOwnProperty("WatchedMovie")) {
        setFireBaseUserData(data[0].WatchedMovie);
      }
    };
    getUserData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };

  const openPopUp = async () => {
    const users = await getAllUserWithFirebase();
    const filteredUsers: filteredUsers[] = users.filter((user) => {
      return user.name?.toLowerCase().includes(userQuery.toLowerCase());
    });
    return dispatch(
      setDialog({
        children: (
          <>
            <div className="bg-[#191919] w-[600px] h-[40vh] text-white overflow-y-auto">
              <SearchInput
                placeholder="Search Profile"
                setUserQuery={setUserQuery}
              ></SearchInput>
              <UserSearch
                userQuery={userQuery}
                setShow={setShow}
                show={show}
                filteredUsers={filteredUsers}
                fireBaseUserData={fireBaseUserData}
              ></UserSearch>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </div>
          </>
        ),
      })
    );
  };
  useEffect(() => {
    openPopUp();
  }, [userQuery, show]);
  useEffect(() => {
    dispatch(fetchWithQuery(query));
  }, [query]);

  return (
    <>
      <Box className=" w-full h-[15%] flex  justify-between items-center">
        <Box className="xl:w-[70%] w-[80%] ">
          <SearchInput
            setQuery={setQuery}
            rounded={"rounded-full"}
            placeholder={"🎬 Search for a movie, tv show..."}
          ></SearchInput>
          {query.length > 0 ? <DropDown results={results}></DropDown> : null}
        </Box>
        <Box onClick={openPopUp}>
          <SearchIcon
            className="text-white ml-1 "
            sx={{
              fontSize: 30,
            }}
            onClick={() => {
              handleClickOpen();
            }}
          ></SearchIcon>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          {...options}
        ></Dialog>
        <AvatarComponet></AvatarComponet>
      </Box>
    </>
  );
};

export default SearchHeader;
