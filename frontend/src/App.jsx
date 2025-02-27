import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import React from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/TopBar";
import DisplayBots from "./components/DisplayBots";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import LoginMenu from "./components/LoginMenu";
import { UserContextProvider } from "./Hooks/fetchProfileData";
import User from "../../backend/models/User";
import { UserContext } from "./Hooks/fetchProfileData";
import LoginComponent from "./components/LoginMenu";
import CreateChatBot from "./components/CreateChatBot";
function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className=" text-white w-full h-screen">
          <Sidebar />
          <TopBar />
          <div className="content">
            <Routes>
              <Route path="/chat" element={<ChatBox />} />
              <Route path="/" element={<DisplayBots />} />
              <Route path="/Home" element={<DisplayBots />} />
              <Route path="/create" element={<CreateChatBot />} />
            </Routes>
          </div>
        </div>
        <LoginComponent />
      </Router>
    </UserContextProvider>
  );
}

export default App;
