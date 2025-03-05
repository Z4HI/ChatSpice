import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Hooks/fetchProfileData";
import axios from "axios";
import { Navigate } from "react-router-dom";

const MyBots = () => {
  const [bots, setBots] = useState([]);
  const { profileData, setProfileData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const loggedIn = profileData.loggedIn;

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getMyBots/${profileData.username}`
        );
        setBots(response.data); // Set the fetched bots to state
        console.log(response.data[0].image);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Turn off loading state once data is fetched
      }
    };

    fetchBots();
  }, []);
  return !loggedIn ? (
    <Navigate to="/" />
  ) : (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-200 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden"
    >
      <div className="font-bold text-4xl w-full bg-red-400 text-center h-20 flex items-center justify-center">
        <h1>My Bots</h1>
      </div>

      <div
        style={{
          width: `calc(100vw - 218px)`,
        }}
        className="mt-10 justify-items-center grid grid-rows-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 h-400 "
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          bots.map((bot, index) => (
            <div
              key={index}
              className="group w-45 h-80 shadow-sm rounded-2xl overflow-hidden hover:cursor-pointer hover:shadow-2xl shadow-red-600 hover:z-10  transform hover:scale-105 transition-all duration-300 hover:border-8  hover:border-red-400"
            >
              <div className=" bg-black h-10 border-b-2">
                Name{bot.charName}
              </div>
              <div className="w-full h-50 bg-amber-500">
                <img
                  className="w-full h-full object-cover"
                  src={bot.image}
                  alt=""
                />
              </div>

              <div className="absolute border-t-2 bottom-0 w-full bg-black h-30 group-hover:h-68 transition-all duration-300 p-4 flex flex-col justify-between">
                <p>{bot.createdBy}</p>
                <p className="overflow-hiddden">{bot.description}</p>
                <p>Rating</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBots;
