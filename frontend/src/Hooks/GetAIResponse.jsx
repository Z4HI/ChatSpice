import React from "react";
import axios from "axios";

const GetAIResponse = async ({ data }) => {
  try {
    const response = await axios.post("http://localhost:3000/chat", data);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return { charResponse: "Error occurred" }; // You may return an error message here for handling
  }
};

export default GetAIResponse;
