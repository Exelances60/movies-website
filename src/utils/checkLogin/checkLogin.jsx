export const checkLogin = (user, navigate) => {
  if (Object.keys(user).length === 0) {
    navigate("/");
  }
};
