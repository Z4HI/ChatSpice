import { React, useContext, useState } from "react";
import { UserContext } from "../Hooks/fetchProfileData";
import { Navigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import UploadPFPcomponent from "./UploadPFPcomponent";

const ProfilePage = () => {
  const { profileData, setProfileData } = useContext(UserContext);
  const loggedIn = profileData.loggedIn;
  const [image, setimage] = useState(null);
  const [pfpEdit, setPfpEdit] = useState(false);

  console.log(profileData);
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

  return loggedIn ? (
    <div
      style={{
        height: `calc(100vh - 140px)`,
        width: `calc(100vw - 218px)`,
      }}
      className=" bg-gray-400 bottom-0 right-0 fixed rounded-tl-3xl overflow-y-auto overflow-x-hidden"
    >
      <div
        style={{
          height: `calc(90vh - 140px)`,
          width: `calc(100vw - 218px)`,
        }}
        className="text-black flex flex-col items-center justify-center"
      >
        <div className="w-[80%] h-[80%] absolute bottom-0 bg-white flex flex-col items-center ">
          <div className="fixed overflow-hidden rounded-full w-30 h-30 bg-red-500 transform -translate-y-10">
            <img
              src={profileData.profileImage}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div
            onClick={() => setPfpEdit(true)}
            className="w-10 h-10 translate-x-20 -translate-y-10 hover:cursor-pointer"
          >
            <Pencil size={30} color="black" />
          </div>
          <UploadPFPcomponent />

          <div className="w-30 h-30 absolute flex justify-center items-center transform translate-y-10 font-extrabold text-2xl">
            @{profileData.username}
          </div>
          <div className="h-10 w-full bg-red-400 mt-30"></div>
          <div>pledasdre</div>
        </div>
      </div>
    </div>
  ) : (
    (setProfileData({ ...profileData, showLogin: true }), (<Navigate to="/" />))
  );
};

export default ProfilePage;
