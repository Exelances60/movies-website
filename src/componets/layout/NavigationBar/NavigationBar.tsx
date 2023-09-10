import { Box, Typography } from "@mui/material";
import ListNav from "./List/List";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOutUser } from "../../../utils/firebase.utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/user/user.reducer";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser();
    dispatch(setUser({}));
    navigate("/");
  };
  return (
    <div className="  w-[25%] hidden md:flex xl:w-[15%] h-full bg-[#212121]  rounded-r-3xl flex-col items-center justify-center md:p-5 xl:p-5 box-border shadow-lg shadow-black ">
      <Box className="w-full h-[15%]  flex items-center justify-center font-bold">
        <Typography
          sx={{
            fontSize: {
              lg: 30,
              md: 25,
              sm: 25,
              xs: 15,
            },
          }}
          className="text-[#3DD2CC] duration-300  hover:scale-110 ease-in cursor-pointer"
          gutterBottom
        >
          MOVİES
        </Typography>
      </Box>

      <Box className="w-full h-[60%]  flex-col justify-center items-center ">
        <Link to="/home">
          <ListNav
            header={"Home"}
            icon={<HomeOutlinedIcon></HomeOutlinedIcon>}
          ></ListNav>
        </Link>
        <ListNav
          header={"Movies"}
          icon={<MovieCreationOutlinedIcon></MovieCreationOutlinedIcon>}
        ></ListNav>
        <ListNav
          header={"TV Series"}
          icon={<TvOutlinedIcon></TvOutlinedIcon>}
        ></ListNav>
        <ListNav
          header={"Upcoming"}
          icon={<DateRangeOutlinedIcon></DateRangeOutlinedIcon>}
        ></ListNav>
      </Box>
      <Box className="w-full h-[25%]  flex justify-end items-end">
        <ListNav
          header={"Log Out"}
          icon={<LogoutOutlinedIcon></LogoutOutlinedIcon>}
          onClick={handleSignOut}
        ></ListNav>
      </Box>
    </div>
  );
};

export default NavigationBar;
