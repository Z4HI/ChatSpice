import React, { use } from "react";
import Switch from "./Switch";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import axios from "axios";
import { useForm } from "react-hook-form";
import UploadImage from "./uploadImageComponent";
import { useContext } from "react";
import { UserContext } from "../Hooks/fetchProfileData";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const CreateChatBot = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Scenario, setScenario] = useState("");
  const [greeting, setGreeting] = useState("");
  const [personality, setPersonality] = useState("");
  const [tags, setTags] = useState([]);
  const [sensitive, setSensitive] = useState(false);
  const [publicView, setPublicView] = useState(false);
  const [physicals, setPhysical] = useState("");
  const [gender, setGender] = useState("");
  const [clothing, setClothing] = useState("");
  const [joinCompetition, setJoinCompetition] = useState(false);
  const [voice, setVoice] = useState(null);
  const [seletedTag, setSelectedTag] = useState("Select TAGS");
  const [tagError, setTagError] = useState(false);
  const [image, setImage] = useState(null);
  const { profileData, setProfileData } = useContext(UserContext);
  const navigate = useNavigate();
  const loggedin = profileData.loggedIn;

  const data = {
    charName: name,
    createdBy: profileData.username,
    description: description,
    scenario: Scenario,
    gender: gender,
    body: physicals,
    personality: personality,
    clothing: clothing,
    greeting: greeting,
    tags: tags,
    nsfw: sensitive,
    public: publicView,
    image: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: [],
      publicView: false,
      sensitive: false,
    },
  });

  const onSubmit = async () => {
    if (tags.length === 0) return;
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    try {
      const imageUrl = await handleImageUpload();
      if (imageUrl == null) {
        alert("Image upload failed.");
        return;
      }
      console.log("creating bot"); // Debugging
      await createBot({ ...data, image: imageUrl }); // ✅ Pass the imageUrl
      console.log("Navigating to /myBots"); // Debugging
      navigate("/myBots");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const createBot = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/createChatBot", data);
      console.log("Bot created successfully:", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.imageUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    }
  };
  const addTag = (event) => {
    const tag = event.target.value;
    if (!tag || tags.includes(tag)) return;
    const newTags = [...tags, tag];
    setTags(newTags);
    setTagError(false);
  };
  const deleteTag = (tag) => {
    event.preventDefault();
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };
  const sensitiveChange = (e) => {
    const value = e.target.checked;
    setSensitive(value);
    setValue("sensitive", value);
  };
  const publicViewChange = (e) => {
    const value = e.target.checked;
    setPublicView(value);
    setValue("publicView", value);
  };
  useEffect(() => {
    if (tags.length === 0) {
      setTagError(true);
    }
  }, [tags]);

  return loggedin ? (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-100 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden flex"
    >
      <div className=" flex flex-col justify-evenly text-center bg-gray-600 h-185 w-60 fixed m-4 rounded-2xl">
        <div>
          <UploadImage
            image={image}
            setImage={setImage}
            creator={profileData.username}
            description={description}
            botName={name}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="border w-30 h-30 hover:cursor-pointer rounded-2xl hover:bg-blue-500"
          >
            Create
          </button>
        </div>
      </div>
      <form
        style={{
          width: `calc(100vw - 502px)`,
        }}
        action=""
        className="mt-5 rounded-2xl left-70 w-full h-390 relative  flex flex-col justify-around overflow-y-scroll"
      >
        <div className="w-full pr-20 h-20 flex  items-center  bg-gray-600 p-5">
          <div className="w-30 ">Name</div>
          <input
            className="border border-white rounded-2xl p-3 ml-10"
            {...register("name", { required: "Name is required" })}
            onChange={(e) => setName(e.target.value)}
            value={name}
            dqw
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5 ">
          <div className="w-30">Description</div>

          <textarea
            name=""
            id=""
            maxLength={160}
            className="border ml-10 rounded-2xl p-3 w-full"
            {...register("description", {
              required: "description is required",
            })}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter a short description that will be displayed"
          ></textarea>
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}
        </div>
        <div className="w-full h-80 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Scenario</div>
          <textarea
            maxLength={300}
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full"
            {...register("scenario", {
              required: "Scenario is required",
            })}
            onChange={(e) => setScenario(e.target.value)}
            value={Scenario}
            placeholder="Enter a scenario or background information for the character"
          ></textarea>
          {errors.scenario && (
            <p className="text-red-600">{errors.scenario.message}</p>
          )}
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Gender</div>
          <select
            className="w-30 p-2 border border-gray-500 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("gender", { required: "Select a gender" })}
            defaultValue={""}
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Body</div>
          <textarea
            name=""
            id=""
            className="border ml-10 rounded-2xl p-3 w-full"
            {...register("physicals")}
            onChange={(e) => setPhysical(e.target.value)}
            value={physicals}
            placeholder="Enter Characters body type, height, weight, etc"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Personality</div>
          <textarea
            {...register("personality")}
            onChange={(e) => setPersonality(e.target.value)}
            value={personality}
            className="border ml-10 rounded-2xl p-3 w-full"
            placeholder="Enter personaility traits of the characer, seperate by comma"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Clothing</div>

          <textarea
            {...register("clothing")}
            onChange={(e) => setClothing(e.target.value)}
            value={clothing}
            className="border ml-10 rounded-2xl p-3 w-full"
            placeholder="Enter characters outfit/clothing {optional}"
          ></textarea>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <div className="w-30">Greeting</div>

          <textarea
            {...register("greeting")}
            onChange={(e) => setGreeting(e.target.value)}
            value={greeting}
            className="border ml-10 rounded-2xl p-3 w-full"
            placeholder="Enter a greeting for the character{optional}"
          ></textarea>
        </div>
        <div className="w-full h-60 flex flex-col items-center justify-evenly bg-gray-700 p-5">
          <div className="w-30 mr-auto">TAGS</div>
          <div className="flex w-full  h-10">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-500 text-white p-2 rounded-2xl ml-3 flex items-center"
              >
                {tag}
                <button
                  onClick={() => deleteTag(tag)}
                  className="flex justify-center items-center hover:cursor-pointer bg-red-600 w-4 h-4 rounded-2xl ml-2"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <select
            {...register("tags", { required: "Select a tag" })}
            onChange={(e) => addTag(e)}
            className="w-50 p-2 mr-auto border-gray-500 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={""}
          >
            <option value="" disabled>
              Select TAGS
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Adventurer">Adventure</option>
          </select>
          {tagError && (
            <p className="text-red-600">Please select at least one tag</p>
          )}
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <Switch
            label="Sensitive?"
            id="sensitive"
            onChange={sensitiveChange}
          />
          <div className="ml-10">Is this content NSFW</div>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          <Switch label="public" id="publicView" onChange={publicViewChange} />
          <div className="ml-10">
            Do you want this Character available for everyone to use?
          </div>
        </div>
        <div className="w-full h-30 flex  items-center  bg-gray-600 p-5">
          Join Comptition option
        </div>
      </form>
    </div>
  ) : (
    (setProfileData({ ...profileData, showLogin: true }), (<Navigate to="/" />))
  );
};

export default CreateChatBot;
