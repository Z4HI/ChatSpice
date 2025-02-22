import React, { useState, useContext } from "react";
import { LoggedinContext } from "../App.jsx";

const Sidebar = ({ setShowLogin }) => {
  const { Loggedin, setLoggedin } = useContext(LoggedinContext);
  return (
    <div className="font-Poppins font-bold text-xl w-[200px] h-screen fixed bg-black flex flex-col justify-evenly text-center ">
      <div className="hover:cursor-pointer h-full flex justify-center items-center">
        LOGO
      </div>

      {Loggedin ? (
        <>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Profile
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Subscribe
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
            Chats
          </div>
          <div className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300">
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
            onClick={() => setLoggedin(false)}
            className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-blue-500 transition-all duration-300"
          >
            Logout
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            setShowLogin(true);
          }}
          className="hover:cursor-pointer h-full flex justify-center items-center hover:bg-gray-500 transition-all duration-300"
        >
          Login
        </div>
      )}
    </div>
  );
};

export default Sidebar;
