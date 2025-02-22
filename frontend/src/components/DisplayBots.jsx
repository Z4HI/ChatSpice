import React from "react";
import { useState } from "react";
import image from "../assets/mikasa3.jpg";
const DisplayBots = () => {
  const [bots, setBots] = useState([
    {
      _id: 1,
      name: "Bot 1",
      description: "Description of Bot 1",
      avatar: "link-to-avatar-image",
      createdAt: "2025-02-18",
    },
    {
      _id: 2,
      name: "Bot 1",
      description: "Description of Bot 2",
      avatar: "link-to-avatar-image",
      createdAt: "2025-02-18",
    },
    {
      _id: 2,
      name: "Bot 1",
      description: "Description of Bot 2",
      avatar: "link-to-avatar-image",
      createdAt: "2025-02-18",
    },
    {
      _id: 2,
      name: "Bot 1",
      description: "Description of Bot 2",
      avatar: "link-to-avatar-image",
      createdAt: "2025-02-18",
    },
    {
      _id: 2,
      name: "Bot 1",
      description: "Description of Bot 2",
      avatar: "link-to-avatar-image",
      createdAt: "2025-02-18",
    },
    {
      _id: 2,
      name: "Bot 1",
      description: "Description of Bot 2",
      avatar: "link-to-avatar-image",
      createdAt: "2025-02-18",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const displayTrending = () => {};

  return (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-black bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden"
    >
      <div
        style={{
          width: `calc(100vw - 218px)`,
        }}
        className="mt-10 justify-items-center grid grid-rows-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 h-400 "
      >
        {bots.map((bot, index) => (
          <div
            key={index}
            className="w-45 h-80 shadow-sm rounded-2xl overflow-hidden hover:cursor-pointer hover:shadow-2xl shadow-blue-600 hover:z-10  transform hover:scale-105 transition-all duration-300 hover:border-8  hover:border-blue-500"
          >
            <div className="w-full h-50 bg-amber-500">
              <img className="w-full h-full object-cover" src={image} alt="" />
            </div>

            <div className="bg-black h-30">
              <p>Description</p>
              <p>Rating</p>
              <p>Creator</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayBots;
