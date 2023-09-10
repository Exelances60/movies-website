import { FC } from "react";
import { HomePageContainerProps } from "../../store/user/user.reducer";
import { useNavigate } from "react-router";

export const checkLogin = (user: HomePageContainerProps) => {
  const navigate = useNavigate();

  if (Object.keys(user).length === 0) {
    navigate("/");
  }
};
