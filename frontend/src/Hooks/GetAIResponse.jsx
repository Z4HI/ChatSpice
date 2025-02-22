import React from "react";
import axios from "axios";

const GetAIResponse = async ({ data }) => {
  const headers = {
    "Content-Type": "application/json", // Corrected the typo in "application/json"
  };
  try {
    const response = await axios.post("http://localhost:3000/api/chat", {
      data: data,
      headers: headers,
    });
    console.log(response.data);
    const output = { charResponse: response.data.choices[0].message.content };

    // Return the output object
    return output;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return { charResponse: "Error occurred" }; // You may return an error message here for handling
  }
};

export default GetAIResponse;
