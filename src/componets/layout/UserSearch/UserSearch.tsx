import React from "react";
import unkownProfile from "../../../assets/image/unkownProfile.webp";
import { FC } from "react";
import { filteredUsers } from "../HomePageContainer/SearchHeader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

type UserTypeProps = {
  userQuery: string;
  filteredUsers: filteredUsers[];
};

const UserSearch: FC<UserTypeProps> = ({ userQuery, filteredUsers }) => {
  const navigate = useNavigate();
  return (
    <>
      {userQuery.length > 0
        ? filteredUsers.map((user, i) => {
            return (
              <div
                key={i}
                className="w-full h-[15%]  mb-2 flex items-center text-white"
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
              </div>
            );
          })
        : null}
    </>
  );
};

export default UserSearch;
