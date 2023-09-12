import { useEffect } from "react";
import { selectUser } from "../../store/user/user.reducer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const useRequireAuth = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user, navigate]);
};
