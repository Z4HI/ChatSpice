import React from "react";
import { useState } from "react";
import { ThumbsUp, Eye, MessageCircleMore } from "lucide-react";

const DisplayBots = () => {
  const [bots, setBots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const displayTrending = () => {};

  return (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-100 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden"
    >
      <div className="z-10 absolute w-full bg-red-400 text-center h-20 flex items-center justify-evenly">
        <div className="">Categories</div>
        <input
          className="rounded-3xl outline-none border-2 p-2 text-sm"
          type="text"
          placeholder="search"
        />
        <h1>Trending</h1>
        <h1>Popular</h1>
      </div>
      <div
        style={{
          width: `calc(100vw - 218px)`,
        }}
        className="mt-10 justify-items-center grid grid-rows-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 h-400 "
      >
        {bots.map((bot, index) => (
          <div
            onClick={() => redirectBotPage(bot._id)}
            key={index}
            className="mt-10 group w-45 h-80 shadow-sm rounded-2xl overflow-hidden hover:cursor-pointer hover:shadow-2xl shadow-red-600 hover:z-10  transform hover:scale-105 transition-all duration-300 hover:border-8  hover:border-red-400"
          >
            <div className="absolute w-full flex justify-evenly h-8 bg-gradient-to-b from-black to-transparent text-white">
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
            <div className="w-full h-50 bg-amber-500">
              <img
                className="w-full h-full object-cover"
                src={bot.image}
                alt=""
              />
            </div>

            <div className="absolute bottom-0 w-full bg-black h-31 group-hover:h-68 transition-all duration-300  flex flex-col justify-between">
              <div className="absolute w-full top-0 h-10 text-center bg-gradient-to-t from-black to-red-400">
                Name: {bot.charName}
              </div>
              <p className="mt-10">Author: {bot.createdBy}</p>
              <p className="overflow-hidden">Description{bot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayBots;
