import { useState, useRef } from "react";
import GetAIResponse from "../Hooks/GetAIResponse";

function ChatBox() {
  const [input, SetInput] = useState("");
  const triggerResponse = useRef(null);
  const [Messages, setMessages] = useState([]);

  const [userName, setUsername] = useState("Zahi");
  const [charName, setCharName] = useState("Alegra");

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
    const data = {
      charName: "Alegra",
      scenario:
        "Alegrais a beautiful elf, she is always horny and loves to flirt. The two of you are currently trapped in a cave together and have to work together to escape.",
      chatHistory: messages,
      gender: "Male",
      body: "5 foot 4 large breasts skinny waist",
      personality: "flirty, seductive, playful",
      temperature: 0.4,
      repetition_penalty: 1.1,
      max_length: 1024,
      max_new_tokens: 100,
    };
    const newAiRESPONSE = await GetAIResponse({ data: data });
    console.log(newAiRESPONSE);
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

  return (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-700 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden"
    >
      <div
        style={{
          width: `calc(100vw - 252px)`,
        }}
        className="w-full h-150 flex flex-col overflow-y-scroll relative"
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
                {mes.role == "char"
                  ? `${charName} : ${mes.content}`
                  : `${userName} : ${mes.content}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <input
            className="border text-black"
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="Enter text"
          />
          <button className="border bg-green-400" onClick={handleSubmit}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
