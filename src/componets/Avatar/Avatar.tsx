import { Box, Button, Menu, MenuItem, Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { signOutUser } from "../../utils/firebase.utils";
import { selectPhotoURL, setUser } from "../../store/user/user.reducer";
import { useSelector } from "react-redux";
import Person2Icon from "@mui/icons-material/Person2";
import { deepPurple } from "@mui/material/colors";

const AvatarComponet = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const photoURLFile = useSelector(selectPhotoURL);
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
    </>
  );
};

export default AvatarComponet;
