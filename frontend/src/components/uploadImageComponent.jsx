import React, { useState } from "react";
import axios from "axios";

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
      <div className="group w-45 h-80 shadow-sm rounded-2xl overflow-hidden  hover:shadow-2xl shadow-red-600 hover:z-10  transform hover:scale-105 transition-all duration-300 hover:border-8  hover:border-red-400">
        <div className=" bg-black border-b-2 h-10">{botName}</div>
        <div className="w-full h-50 bg-gray-500">
          {image ? (
            <img className="w-full h-full object-cover" src={preview} alt="" />
          ) : (
            <p className="text-white text-center">No Image</p>
          )}
        </div>

        <div className="border-t-2 absolute bottom-0 w-full bg-black h-30 group-hover:h-68 transition-all duration-300 p-4 flex flex-col justify-between">
          <p className="text-white font-bold">Author: {creator}</p>
          <p className="text-white overflow-hidden text-sm">
            Description: {description}
          </p>
          <p>Rating: 4/5</p>
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
