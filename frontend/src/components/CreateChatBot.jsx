import React from "react";
import Switch from "./Switch";
import { useState } from "react";

const CreateChatBot = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [greeting, setGreeting] = useState("");
  const [traits, setTraits] = useState("");
  const [tags, setTags] = useState([]);
  const [sensitive, setSensitive] = useState(false);
  const [publicView, setPublicView] = useState(false);
  const [physicals, setPhysical] = useState("");
  const [gender, setGender] = useState("");
  const [joinCompetition, setJoinCompetition] = useState(false);
  const [image, setImage] = useState(null);
  const [voice, setVoice] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleGreetingChange = (event) => {
    setGreeting(event.target.value);
  };
  const handlePhysicalChange = (event) => {
    setPhysical(event.target.value);
  };

  const handleTraitsChange = (event) => {
    setTraits(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };
  const handleSensitiveChange = (event) => {
    setSensitive(event.target.value);
  };
  const handlePublicViewChange = (event) => {
    setPublicView(event.target.value);
  };
  const handleJoinCompetitionChange = (event) => {
    setJoinCompetition(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };
  const handleVoiceChange = (event) => {
    setVoice(event.target.value);
  };
  return (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-700 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden flex"
    >
      <div className=" flex flex-col justify-evenly text-center bg-gray-600 h-185 w-60 fixed m-4 rounded-2xl">
        <div> description</div>
        <div>image</div>
        <div>Voice</div>
        <div>
          <button className="border w-30 h-30 hover:cursor-pointer rounded-2xl hover:bg-blue-500">
            Create
          </button>
        </div>
      </div>
      <form
        style={{
          width: `calc(100vw - 502px)`,
        }}
        action=""
        className="left-70 w-full h-390 relative  flex flex-col justify-around overflow-y-scroll"
      >
        <div className="w-full pr-20 h-20 flex  items-center  bg-gray-600 rounded-2xl p-5">
          <div className="w-30">Name</div>
          <input
            type="text"
            className="border ml-10 rounded-2xl p-3 w-100"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Name for your character"
          />
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5 rounded-2xl">
          <div className="w-30">Description</div>

          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full"
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Enter a short description that will be displayed"
          ></textarea>
        </div>
        <div className="w-full h-80 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">prompt</div>
          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full h-full"
            onChange={handlePromptChange}
            value={prompt}
            placeholder="Enter Context on who the character is and the world they live in or other information"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Greeting</div>

          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full"
            onChange={handleGreetingChange}
            value={greeting}
            placeholder="Enter a greeting for the character{optional}"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Gender</div>
          <select
            className="w-30 p-2 border border-gray-500 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Body</div>

          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full h-30"
            onChange={handlePhysicalChange}
            value={physicals}
            placeholder="Enter physical traits of the character, seperate by comma(ex : 5 foot 2 inches tall, large --)"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Traits</div>

          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full"
            onChange={handleTraitsChange}
            value={traits}
            placeholder="Enter personaility traits of the characer, seperate by comma"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">TAGS</div>

          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full"
            onChange={handleTagsChange}
            value={tags}
            placeholder="Tags for the character"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <Switch
            label="Sensitive?"
            id="s1"
            onChange={handleSensitiveChange}
            value={sensitive}
          />
          <div className="ml-10">Is this content NSFW</div>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">
            <Switch
              label="Public"
              id="s2"
              onChange={handlePublicViewChange}
              value={publicView}
            />
          </div>

          <div className="ml-10">
            Do you want this Character available for everyone to use?
          </div>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          Join Comptition option
        </div>
      </form>
    </div>
  );
};

export default CreateChatBot;
