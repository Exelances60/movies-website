import { ListItem, ListItemAvatar, ListItemText, List } from "@mui/material";
import React from "react";
import { FC } from "react";

type ListNavProps = {
  header: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const ListNav: FC<ListNavProps> = ({ header, icon, onClick }) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          color: "white",
        }}
        onClick={onClick}
        className="cursor-pointer hover:text-[#3DD2CC] duration-200 ease-in 

    "
      >
        <ListItem className="mb-12">
          <ListItemAvatar sx={{ display: { xs: "none", sm: "flex" } }}>
            {icon}
          </ListItemAvatar>
          <ListItemText>{header}</ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default ListNav;
