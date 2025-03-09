import React, { useState } from "react";
import axios from "axios";
import { ThumbsUp, Eye, MessageCircleMore } from "lucide-react";

const UploadImage = ({ image, setImage, creator, description, botName }) => {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-evenly h-140 ">
      <div className="mt-10 group w-45 h-80 shadow-sm rounded-2xl overflow-hidden hover:cursor-pointer hover:shadow-2xl shadow-red-600 hover:z-10  transform  transition-all duration-300 hover:border-8  hover:border-red-400">
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
          <img className="w-full h-full object-cover" src={preview} alt="" />
        </div>

        <div className="absolute bottom-0 w-full bg-black h-31 group-hover:h-68 transition-all duration-300  flex flex-col justify-between">
          <div className="absolute w-full top-0 h-10 text-center bg-gradient-to-t from-black to-red-400">
            Name: {botName}
          </div>
          <p className="mt-10">Author: {creator}</p>
          <p className="overflow-hidden">Description: {description}</p>
        </div>
      </div>
      <div
        className={` w-40 border-2 ${
          dragging ? "border-blue-500 bg-blue-100" : "border-gray-400"
        } border-dashed rounded-lg flex items-center justify-center cursor-pointer`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <p className="text-gray-500">Drag & Drop an image or Click to Upload</p>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <label className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" // Hides default input
        />
      </label>
    </div>
  );
};

export default UploadImage;
