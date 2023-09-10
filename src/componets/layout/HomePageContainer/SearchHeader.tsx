import { Avatar, Box } from "@mui/material";
import { FC } from "react";
import SearchInput from "../../input/SearchInput";
import { deepPurple } from "@mui/material/colors";
import { selectUser, userResults } from "../../../store/user/user.reducer";
import { useSelector } from "react-redux";

type SearchHeaderProps = {
  displayName?: string;
  photoURL?: string;
  user?: userResults | null;
};

const SearchHeader: FC<SearchHeaderProps> = () => {
  const userData = useSelector(selectUser);
  const { user } = userData;
  const displayName = user?.displayName || "Anonim";
  const photoURL = user?.photoURL;
  return (
    <>
      <Box className=" w-full h-[15%] flex  justify-between items-center">
        <Box className="w-[70%] ">
          <SearchInput></SearchInput>
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
