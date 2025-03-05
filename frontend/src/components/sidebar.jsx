import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Hooks/fetchProfileData";
import { set } from "mongoose";
import LoginComponent from "./LoginMenu";
import image from "../assets/chatspice.png";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpeg";
import bg1 from "../assets/bg1.jpeg";

const Sidebar = () => {
  const { profileData, setProfileData } = useContext(UserContext);
  const navigate = useNavigate();
  const navigateCreate = () => {
    navigate("/Create");
  };
  const navigateHome = () => {
    navigate("/Home");
  };
  const navigateMyBots = () => {
    navigate("/myBots");
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg1})` }}
      className="font-Poppins font-bold text-xl w-[200px] h-screen fixed bg-center bg-contain flex flex-col items-center text-center "
    >
      <div className="flex justify-center items-center ">
        <div className="fixed h-900 w-40 flex justify-center items-center  backdrop-blur-3xl bg-black/10  "></div>
        <div className="z-10 h-40 w-40 flex justify-center items-center mt-10">
          <img
            onClick={navigateHome}
            src={image}
            alt="LOGO"
            className=" h-40 w-40 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] hover:cursor-pointer hover:drop-shadow-[0_0_20px_rgba(255,0,0,0.9)] transition duration-300 "
          />
        </div>
      </div>

      {profileData.loggedIn === true ? (
        <>
          <div className="flex  justify-center items-center w-full h-20">
            <div className="fixed h-20 w-40 flex justify-center items-center  backdrop-blur-3xl mt-10  "></div>
            <div className="z-10 hover:cursor-pointer w-35 flex justify-center items-center ">
              {profileData.profileImage ? (
                <div className="flex justify-center w-35 h-17 items-center hover:bg-red-500 transition-all duration-300">
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className=" h-10 rounded-full z-10 "
                  />
                  <div>{profileData.username}</div>
                </div>
              ) : (
                "Profile"
              )}
            </div>
          </div>

          <div className="z-1 hover:cursor-pointer w-35 h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300">
            Subscribe
          </div>
          <div
            onClick={navigateMyBots}
            className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300"
          >
            My Bots
          </div>
          <div
            onClick={navigateCreate}
            className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300"
          >
            Create
          </div>
          <div className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300">
            Favorites
          </div>
          <div className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300">
            Notifications
          </div>
          <div className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300">
            Leaderboards
          </div>
          <div className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300">
            Help
          </div>
          <div className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300">
            twitter/IG
          </div>
          <div
            onClick={() => setProfileData({ ...profileData, loggedIn: false })}
            className="z-1 w-35 hover:cursor-pointer h-full flex justify-center items-center hover:bg-red-500 transition-all duration-300"
          >
            Logout
          </div>
        </>
      ) : (
        <div className=" h-full w-full flex justify-center items-center ">
          <h2 className=" fixed w-40 h-40 backdrop-blur-3xl"></h2>
          <h2
            onClick={() => {
              setProfileData({ ...profileData, showLogin: true });
            }}
            className=" rounded-2xl relative flex flex-col justify-center w-[70%] h-20 hover:cursor-pointer hover:bg-red-500 transition-all duration-300 drop-shadow-md [-webkit-text-stroke:1px_black] text-4xl"
          >
            Login
          </h2>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
