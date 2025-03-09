import React, { useState } from "react";
import axios from "axios";
import { ThumbsUp, Eye, MessageCircleMore } from "lucide-react";

const UploadPFPcomponent = ({ image, setImage }) => {
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
    <div className="z-20 flex flex-col w-100 h-70 items-center justify-evenly bg-gray-300 absolute -translate-y-10">
      <div className="w-30 h-30 bg-white rounded-full object-cover overflow-hidden">
        <img src={preview} alt="" className="h-full w-full" />
      </div>
      <div className="flex justify-evenly w-full">
        <div
          className={` w-30 h-30 border-2 ${
            dragging ? "border-blue-500 bg-blue-100" : "border-gray-400"
          } border-dashed rounded-lg flex items-center justify-center cursor-pointer`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <p className="text-gray-500">
            Drag & Drop an image or Click to Upload
          </p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <label className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer w-30 h-30">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden" // Hides default input
          />
        </label>
      </div>
    </div>
  );
};

export default UploadPFPcomponent;
