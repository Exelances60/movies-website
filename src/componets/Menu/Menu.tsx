import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ListNav from "../layout/NavigationBar/List/List";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
const options = ["None", "Atria"];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:hidden">
      <IconButton
        aria-label="more"
        size="large"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: "white",

          position: "absolute",
        }}
      >
        <MenuIcon sx={{ fontSize: "2.5rem" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: ITEM_HEIGHT * 10.5,
            width: "20ch",
            backgroundColor: "#212121",
            borderRadius: "10px",
          },
        }}
      >
        <Link to="/home">
          <ListNav
            header={"Home"}
            icon={<HomeOutlinedIcon></HomeOutlinedIcon>}
          ></ListNav>
        </Link>
        <Link to="/moviesAll">
          <ListNav
            header={"Movies"}
            icon={<MovieCreationOutlinedIcon></MovieCreationOutlinedIcon>}
          ></ListNav>
        </Link>
        <Link to="/tvSeries">
          <ListNav
            header={"TV Series"}
            icon={<TvOutlinedIcon></TvOutlinedIcon>}
          ></ListNav>
        </Link>
        <ListNav
          header={"Upcoming"}
          icon={<DateRangeOutlinedIcon></DateRangeOutlinedIcon>}
        ></ListNav>
      </Menu>
    </div>
  );
}
