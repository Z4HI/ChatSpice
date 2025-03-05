import { useState } from "react";
import { useForm } from "react-hook-form";

const Switch = ({ label, id, onChange }) => {
  // Get current state from react-hook-form
  const [isChecked, setIsChecked] = useState(false);
  const handlechange = (e) => {
    setIsChecked((prev) => !prev);
    if (onChange) {
      onChange(e); // Call the passed onChange handler
    }
  };
  return (
    <div className="flex items-center space-x-2">
      {/* Label for accessibility */}
      <label htmlFor={id} className="relative inline-block w-12 h-7">
        {/* Hidden checkbox controlled by React Hook Form */}
        <input
          onChange={handlechange}
          type="checkbox"
          id={id}
          className="hidden"
          checked={isChecked}
        />
        {/* Track (background) */}
        <span
          className={`block w-12 h-7 rounded-full transition-colors duration-300 cursor-pointer 
          ${isChecked ? "bg-red-500" : "bg-gray-400"}`}
        ></span>
        {/* Knob (moving part) */}
        <span
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 
          ${isChecked ? "translate-x-5" : ""}`}
        ></span>
      </label>
      {/* Label Text */}
      <span className="text-gray-700">{label}</span>
    </div>
  );
};

export default Switch;
