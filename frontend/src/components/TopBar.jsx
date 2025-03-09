import React from "react";
import bg2 from "../assets/bg2.jpeg";
import bg1 from "../assets/bg1.jpeg";
import { useContext } from "react";
import { UserContext } from "../Hooks/fetchProfileData";

const TopBar = () => {
  const { profileData, setProfileData } = useContext(UserContext);
  const loggedIn = profileData.loggedIn;
  return (
    <div
      style={{ width: `calc(100vw - 218px)`, backgroundImage: `url(${bg1})` }}
      className="h-30 w-screen-50 bg-contain flex flex-col justify-evenly fixed items-center right-0 rounded-bl-3xl"
    >
      <div className="w-full flex justify-evenly items-center">
        {loggedIn ? (
          <div className="text-white">Tokens : {profileData.tokenAmount}</div>
        ) : (
          <div className="">
            <h4 className="w-full text-center">Leaderoards</h4>
            <div className="bg-gray-600 w-100 grid grid-cols-2 grid-rows-3">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>5</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
