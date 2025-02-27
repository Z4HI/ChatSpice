import axios from "axios";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    profileImage: "",
    tokenAmount: 0,
    isSubscribed: false,
    subscriptionEnd: null,
    createdChatbots: [],
    chatHistory: [],
    dateCreated: {},

    level: 1,
    experience: 0,
    loggedIn: false,
    showLogin: false,
  });

  useEffect(() => {
    if (profileData.loggedIn) {
      console.log(profileData.email);
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/GetUserInfo",
            {
              params: { email: profileData.email },
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setProfileData((prevProfileData) => ({
            ...prevProfileData,
            ...response.data,
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfile();
    }
  }, [profileData.loggedIn]);

  return (
    <UserContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </UserContext.Provider>
  );
};
