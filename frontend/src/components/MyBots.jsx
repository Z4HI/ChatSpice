import React, { use } from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Hooks/fetchProfileData";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThumbsUp, Eye, MessageCircleMore, MessageCircleX } from "lucide-react";
import { set } from "mongoose";

const MyBots = () => {
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);
  const { profileData, setProfileData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loggedIn = profileData.loggedIn;

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getMyBots/${profileData.username}`
        );
        setBots(response.data); // Set the fetched bots to state
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Turn off loading state once data is fetched
      }
    };

    fetchBots();
  }, []);
  const redirectBotPage = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/botPage/${id}`);
      navigate(`/chat/${response.data._id}`, {
        state: { botData: response.data },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBot = async (id, botName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${botName}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const deleted = await axios.delete(
          `http://localhost:3000/deleteBot/${id}`
        );
        if (deleted) {
          Swal.fire("Deleted!", `${botName} has been removed.`, "success");
          setBots((prevBots) => prevBots.filter((bot) => bot._id !== id));
        }
      } catch (error) {
        console.error("Error deleting bot:", error);
        Swal.fire("Error", "Failed to delete the bot.", "error");
      }
    }
  };

  return !loggedIn ? (
    (setProfileData({ ...profileData, showLogin: true }), (<Navigate to="/" />))
  ) : (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-200 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden"
    >
      <div
        style={{
          width: `calc(100vw - 218px)`,
        }}
        className="z-10 fixed font-bold text-4xl w-full bg-red-400 text-center h-20 flex items-center justify-center"
      >
        <h1>My Bots : {bots.length}</h1>
      </div>

      <div
        style={{
          width: `calc(100vw - 218px)`,
        }}
        className="mt-25 justify-items-center row-auto grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 h-400 "
      >
        {bots.length <= 0 ? (
          <div>No Bots Yet</div>
        ) : (
          bots?.map((bot, index) => (
            <div
              key={index}
              className=" mt-10 group w-45 h-80 shadow-sm rounded-2xl overflow-visible hover:cursor-pointer hover:shadow-2xl shadow-red-600 transform  transition-all duration-300 hover:border-8  hover:border-red-400"
            >
              <div
                onClick={() => deleteBot(bot._id, bot.charName)}
                className="bg-black h-10 w-10 absolute z-50 right-0 translate-y-[-25px] translate-x-[30px] flex items-center justify-center rounded-full hover:bg-red-500"
              >
                <MessageCircleX size={30} />
              </div>
              <div className="rounded-2xl absolute w-full flex justify-evenly h-8 bg-gradient-to-b from-black to-transparent text-white">
                <p className="flex items-center justify-evenly w-10">
                  <ThumbsUp size={15} /> 0
                </p>
                <p className="flex items-center justify-evenly w-10">
                  <Eye size={15} /> 0
                </p>
                <p className="flex items-center justify-evenly w-10">
                  <MessageCircleMore size={15} /> 0
                </p>
              </div>
              <div className="w-full h-50 bg-amber-500 rounded-t-2xl">
                <img
                  className="w-full h-full object-cover rounded-t-2xl"
                  src={bot.image}
                  alt=""
                />
              </div>

              <div
                onClick={() => redirectBotPage(bot._id)}
                className="absolute bottom-0 w-full bg-black h-31 group-hover:h-68 transition-all duration-300  flex flex-col justify-between"
              >
                <div className="absolute w-full top-0 h-10 text-center bg-gradient-to-t from-black to-stone-600">
                  Name: {bot.charName}
                </div>
                <p className="mt-10">Author: {bot.createdBy}</p>
                <p className="overflow-hidden">Description{bot.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBots;
