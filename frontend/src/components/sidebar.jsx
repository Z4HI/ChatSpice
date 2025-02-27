import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Hooks/fetchProfileData";
import { set } from "mongoose";
import LoginComponent from "./LoginMenu";
import image from "../assets/chatspice.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { profileData, setProfileData } = useContext(UserContext);
  const navigate = useNavigate();
  const navigateCreate = () => {
    navigate("/Create");
  };
  const navigateHome = () => {
    navigate("/Home");
  };

  return (
    <div className="font-Poppins font-bold text-xl w-[200px] h-screen fixed bg-black flex flex-col justify-evenly text-center ">
      <div className=" h-full flex justify-center items-center hover:">
        <img
          onClick={navigateHome}
          src={image}
          alt="LOGO"
          className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] hover:cursor-pointer hover:drop-shadow-[0_0_20px_rgba(255,0,0,0.9)] transition duration-300 "
        />
      </div>
      {profileData.loggedIn === true ? (
        <>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            {profileData.profileImage ? (
              <>
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>{profileData.username}</div>
              </>
            ) : (
              "Profile"
            )}
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Subscribe
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Chats
          </div>
          <div
            onClick={navigateCreate}
            className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300"
          >
            Create
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Favorites
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Notifications
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Leaderboards
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Help
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            twitter/IG
          </div>
          <div
            onClick={() => setProfileData({ ...profileData, loggedIn: false })}
            className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300"
          >
            Logout
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            setProfileData({ ...profileData, showLogin: true });
          }}
          className=" h-full w-full flex justify-center items-center "
        >
          <h2 className="flex flex-col justify-center w-[80%] h-10 hover:cursor-pointer hover:bg-blue-500 transition-all duration-300">
            Login
          </h2>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
