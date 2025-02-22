import { createContext, useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/TopBar";
import DisplayBots from "./components/DisplayBots";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import LoginMenu from "./components/LoginMenu";
export const LoggedinContext = createContext();

function App() {
  const [Loggedin, setLoggedin] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  return (
    <LoggedinContext.Provider value={{ Loggedin, setLoggedin }}>
      <Router>
        <div className=" text-white w-full h-screen">
          <Sidebar setShowLogin={setShowLogin} />
          <TopBar />
          <div className="content">
            <Routes>
              <Route path="/chat" element={<ChatBox />} />
              <Route path="/" element={<DisplayBots />} />
              <Route path="/Home" element={<DisplayBots />} />
            </Routes>
          </div>
          {showLogin && <LoginMenu setShowLogin={setShowLogin} />}
        </div>
      </Router>
    </LoggedinContext.Provider>
  );
}

export default App;
