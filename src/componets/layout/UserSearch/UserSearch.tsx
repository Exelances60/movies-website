import React, { Dispatch, SetStateAction } from "react";
import unkownProfile from "../../../assets/image/unkownProfile.webp";
import { FC } from "react";
import { filteredUsers } from "../HomePageContainer/SearchHeader";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../store/store";
import { IClickMovieDetails } from "../../../store/movieData/movie.reducer";
import ProfileWatched from "../ProfileWatched/ProfileWatched";

type UserTypeProps = {
  userQuery: string;
  filteredUsers: filteredUsers[];
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  fireBaseUserData: IClickMovieDetails[];
};

const UserSearch: FC<UserTypeProps> = ({
  userQuery,
  filteredUsers,
  setShow,
  show,
  fireBaseUserData,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      {userQuery.length > 0 && show === false
        ? filteredUsers.map((user, i) => {
            return (
              <div
                key={i}
                className="w-full h-[15%]  mb-2 flex items-center  text-white"
              >
                <div className="w-[15%] p-1 h-full">
                  <img
                    src={user.photoUrl || unkownProfile}
                    alt=""
                    onClick={() => {
                      navigate(`/profile/${user.uid}`, { state: { user } });
                    }}
                    className="w-full h-full object-contain cursor-pointer rounded-md hover:brightness-110   transition duration-300 ease-in shadow-2xl"
                  ></img>
                </div>
                <div className="cursor-pointer hover:text-[#f9a825] transition flex flex-col duration-200 ease-in">
                  <p>{user.name}</p>
                  <p>
                    Puanladıgı Filmler :
                    {user.WatchedMovie?.length === undefined
                      ? "0"
                      : user.WatchedMovie.length}
                  </p>
                </div>

                <Button
                  variant="contained"
                  sx={{
                    marginLeft: "20px",
                  }}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Film Öner
                </Button>
              </div>
            );
          })
        : null}
      {show ? (
        <div className="w-full h-[100vh]">
          <ProfileWatched
            fireBaseUserData={fireBaseUserData}
            send={true}
            filteredUsers={filteredUsers}
          ></ProfileWatched>
        </div>
      ) : null}
    </>
  );
};

export default UserSearch;
