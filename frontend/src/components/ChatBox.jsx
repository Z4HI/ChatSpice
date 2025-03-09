import { useState, useRef, useContext, use } from "react";
import GetAIResponse from "../Hooks/GetAIResponse";
import { useLocation, Navigate } from "react-router-dom";
import { UserContext } from "../Hooks/fetchProfileData";

function ChatBox({ data }) {
  const location = useLocation();
  const { botData } = location.state;
  const { profileData, setProfileData } = useContext(UserContext);
  const [input, SetInput] = useState("");
  const triggerResponse = useRef(null);
  const [Messages, setMessages] = useState([]);
  const [userName, setUsername] = useState(profileData.username);
  const [charName, setCharName] = useState(botData.charName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loggedIn = profileData.loggedIn;
  const handleInput = (event) => {
    SetInput((prevInput) => event.target.value);
  };
  const handleSubmit = () => {
    if (input.trim() === "") {
      return;
    }
    const newMessage = { role: "user", content: input };
    setMessages((prevMessage) => [...prevMessage, newMessage]);
    SetInput("");
    const updatedMessages = [...Messages, newMessage];
    renderAIresponse(updatedMessages);
  };

  const renderAIresponse = async (messages) => {
    const input = {
      charName: data.charName,
      scenario: data.scenario,
      gender: data.gender,
      body: data.body,
      personality: data.personality,
      clothing: data.clothing,
      chatHistory: messages,
      temperature: 0.6,
      repetition_penalty: 1.1,
      max_length: 1024,
      max_new_tokens: 100,
    };
    const newAiRESPONSE = await GetAIResponse({ data: input });
    const formattedRES = {
      role: "system",
      content: newAiRESPONSE,
    };
    setMessages((prevMessage) => [...prevMessage, formattedRES]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger the same function as the button click
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  console.log(botData);
  return loggedIn ? (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-700 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden flex flex-col items-center"
    >
      <div className="w-full h-20 pl-4 pr-4 bg-red-400 flex justify-evenly items-center">
        <div
          className="w-100 flex justify-center hover:cursor-pointer"
          onClick={toggleDropdown}
        >
          Bot Info
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }  bg-gray-700 rounded-lg p-4 absolute z-10 mt-10 w-100`}
          >
            <p>
              <strong>Author:</strong> {botData.createdBy}
            </p>
            <p>
              <strong>Description:</strong> {botData.description}
            </p>
            <p>
              <strong>Gender:</strong> {botData.gender}
            </p>
            <p>
              <strong>Body:</strong> {botData.body}
            </p>
            <p>
              <strong>Personality:</strong> {botData.personality}
            </p>
            <p>
              <strong>Clothing:</strong> {botData.clothing}
            </p>
          </div>
        </div>
        <div>
          <div>likes</div>
          <div>favorite</div>
        </div>
        <div>Options</div>
      </div>
      <div
        style={{
          width: `calc(100vw - 252px)`,
        }}
        className="w-full h-150 flex flex-col overflow-y-auto  relative bg-black mt-10 rounded-2xl p-4 border-red-500"
      >
        <div className="text-2xl text-red-500 flex flex-col">
          Conversation:
          <ul>
            {Messages.map((mes, index) => (
              <li
                className={`${
                  mes.role == "user" ? "text-blue-500" : "text-red-500"
                }`}
                key={index}
              >
                {mes.role == "user"
                  ? `${userName} : ${mes.content}`
                  : `${charName} : ${mes.content}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="  w-full p-4 flex h-20">
        <input
          className="border text-black w-full p-2"
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Enter text"
        />
        <button className="w-30 border bg-green-400" onClick={handleSubmit}>
          Enter
        </button>
      </div>
    </div>
  ) : (
    (setProfileData({ ...profileData, showLogin: true }), (<Navigate to="/" />))
  );
}

export default ChatBox;
