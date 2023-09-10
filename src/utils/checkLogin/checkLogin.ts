import { FC } from "react";
import { HomePageContainerProps } from "../../store/user/user.reducer";
import { useNavigate } from "react-router";
export const navigate = useNavigate();
export const checkLogin = (user: HomePageContainerProps) => {
  if (Object.keys(user).length === 0) {
    navigate("/");
  }
};
