import React from "react";

const TopBar = () => {
  return (
    <div
      style={{ width: `calc(100vw - 218px)` }}
      className="h-30 w-screen-50 bg-black flex flex-col justify-evenly fixed items-center right-0 rounded-bl-3xl"
    >
      <div className="w-full flex justify-evenly items-center">
        <div className="">Categories</div>
        <input
          className="rounded-3xl outline-none border-2 p-2 text-sm"
          type="text"
          placeholder="search"
        />
        <div className="">
          <h4 className="w-full text-center">Leaderoards</h4>
          <div className="bg-gray-600 w-100 grid grid-cols-2 grid-rows-3">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
