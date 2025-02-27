import { useState, useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { app } from "../firebase";
import debounce from "lodash.debounce";
import { FaCheckCircle } from "react-icons/fa";
import { TiTimesOutline } from "react-icons/ti";
import { UserContext } from "../Hooks/fetchProfileData";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [borderColor, setBorderColor] = useState("border-gray-300");
  const [validusername, setValidusername] = useState(false);
  const { profileData, setProfileData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    const newUsername = e.target.value;
    setUsername(newUsername);
    setBorderColor("border-gray-300"); // Reset to default if input is empty

    checkUsername(newUsername); // Call the debounced function
  };
  const NavigateHome = () => {
    navigate("/Home"); // Navigate to the "about" page
  };
  const auth = getAuth(app);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const response = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "http://localhost:3000/oauth/google",
        {
          email: response.user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      if (data.hasAccount == false) {
        console.log("user does not exist");
        setUserExists(false);
        setIsRegistering(true);
        setEmail(response.user.email);
        setPfp(response.user.photoURL);
      } else {
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          loggedIn: true, // Mark as logged in
          showLogin: false, // Hide the login form
          profileImage: response.user.photoURL,
          email: response.user.email,
        }));
        NavigateHome();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUsername = debounce(async (username) => {
    if (!username) {
      setMessage(""); // Clear message if username is empty
      setBorderColor("border-gray-300");
      setLoading(false);
      setValidusername(false);
      return;
    }
    try {
      setLoading(true); // Set loading state while waiting for response
      const response = await axios.post(
        "http://localhost:3000/checkUsername",
        {
          username: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const iconMsg = response.data.message;
      setMessage(iconMsg);
      if (response.data.message === "Username is available") {
        setValidusername(true);
        setBorderColor("border-green-500"); // Green for available username
      } else {
        setBorderColor("border-red-500"); // Red for taken username
        setValidusername(false);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        setBorderColor("border-red-500");
        setValidusername(false);
      }
    } finally {
      setLoading(false); // Reset loading state after request is done
    }
  }, 500);

  const createNewUser = () => {
    if (validusername === true) {
      try {
        const response = axios.post(
          "http://localhost:3000/createUser",
          {
            username: username,
            email: email,
            pfp: pfp,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          showLogin: false,
          profileImage: pfp,
          username: username,
          email: email,
        }));
      } catch (error) {}
      console.log("lets create a user");
    }
  };

  return (
    profileData.showLogin && (
      <div className=" w-full h-full  grid place-items-center text-black font-Poppins font-bold">
        <div className="absolute inset-0 bg-gray-500/10 backdrop-blur-sm"></div>
        <div className="bg-white fixed w-100 h-80 rounded-2xl flex flex-col justify-evenly top-1/3">
          <div className="flex justify-center">
            <div
              onClick={() =>
                setProfileData({ ...profileData, showLogin: false })
              } // Close the login menu
              className="hover:cursor-pointer
             w-6 h-6 bg-black right-5 top-5 absolute flex items-center justify-center rounded-2xl"
            >
              <TiTimesOutline className="" size={30} color="red" />
            </div>

            <div className="text-4xl">
              {isRegistering ? "Create Account " : "Sign In"}
            </div>
          </div>
          {!userExists ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-70 rounded-md 0">Create Username</div>
              <input
                className={`w-70 border-2 p-2 ${borderColor} focus:outline-none focus:ring-2`}
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
              />
              {message == "" ? (
                <p></p> // Show this when loading is true
              ) : message === "Username is available" ? (
                <p className="flex items-center">
                  {message} <FaCheckCircle className="ml-2" color="green" />{" "}
                  {/* Render when username is available */}
                </p>
              ) : (
                <p className="flex items-center">
                  {message} <TiTimesOutline className="ml-2" color="red" />{" "}
                  {/* Render when username is not available */}
                </p>
              )}
              <button
                onClick={createNewUser}
                type="button"
                className="w-70 h-10 bg-blue-600 rounded-md mx-auto text-white hover:cursor-pointer"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="w-full flex" onClick={handleGoogleLogin}>
              <button
                type="button"
                className="w-70 h-10 bg-red-500 rounded-2xl mx-auto text-white hover:cursor-pointer"
              >
                Sign in with google
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default LoginComponent;
