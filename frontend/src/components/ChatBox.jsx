import { useState, useRef } from "react";
import GetAIResponse from "../Hooks/GetAIResponse";

function ChatBox() {
  const [input, SetInput] = useState("");
  const triggerResponse = useRef(null);
  const [Messages, setMessages] = useState([]);

  const [userName, setUsername] = useState("Zahi");
  const [charName, setCharName] = useState("Aqua");

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
    const context = {
      context: `
      ${charName} is a graceful elf with sapphire-blue hair that flows like a river, matching her deep, ocean-colored eyes. As a protector of her forest home, she is known for her mastery over water magic and her compassionate heart. Though often playful and curious, Aqua has a fierce determination when it comes to protecting those she cares about. Whether casting spells, exploring ancient ruins, or offering wisdom to weary travelers, Aqua’s presence is both calming and commanding. She’s a symbol of resilience and the beauty of nature, with a spirit as wild and free as the sea.
      Personality traits : Compassionate, playful, protective, empathetic, curious, resilient, independent, wise, charming.
      `,
    };

    const data = {
      name1: `${userName}`,
      name2: `${charName}`,
      messages: messages,
      context: context.context,
      mode: "chat",
      max_tokens: 250,
      preset: "Midnight Enigma",
      chat_instruct_command:
        "Continue the chat dialogue below. Write a single reply for the character, surrund textwith quotation marks always ",
    };
    const newAiRESPONSE = await GetAIResponse({ data: data });
    const formattedRES = { role: "char", content: newAiRESPONSE.charResponse };
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
      <div className="w-full h-full fixed flex flex-col">
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
