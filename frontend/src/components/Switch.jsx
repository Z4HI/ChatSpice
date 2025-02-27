import React, { useState } from "react";

const Switch = ({ label, id }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700"></span>
      <label htmlFor={id} className="relative inline-block w-10 mr-2">
        <input
          type="checkbox"
          id={id}
          className="hidden"
          checked={isChecked}
          onChange={handleChange}
        />
        {/* Background color change based on state */}
        <span
          className={`block w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
            isChecked ? "bg-red-500" : "bg-gray-300"
          }`}
        ></span>
        {/* Dot movement and color */}
        <span
          className={`toggle-dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            isChecked ? "transform translate-x-4" : ""
          }`}
        ></span>
      </label>
      <span className="text-gray-700">{label}</span>
    </div>
  );
};

export default Switch;
