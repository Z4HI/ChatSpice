import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import createUser from "./createUser.js";
import User from "./models/User.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
connectToDatabase();
const runpodURL = "https://l22iy1n2yfu8li-8000.proxy.runpod.net/generate";
app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(`${runpodURL}`, req.body, {
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
    });
    return res.json(response.data);
  } catch (err) {
    return res.send(err);
  }
});
//OAuth 2.0
app.post("/oauth/google", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser && existingUser.username) {
      return res.json({ hasAccount: true });
    }
    return res.json({ hasAccount: false });
  } catch (error) {
    console.error(error);
  }
});
//checking if username is available
app.post("/checkUsername", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const existingUser = await User.findOne({
    username: { $regex: `^${username}$`, $options: "i" },
  });
  if (existingUser) {
    // If username is taken
    return res.status(400).json({ message: "Username is already taken" });
  } else {
    // If username is available
    return res.status(200).json({ message: "Username is available" });
  }
});
//creating a new user
app.post("/createUser", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      profileImage: req.body.pfp,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/GetUserInfo", async (req, res) => {
  console.log(req.query.email);
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
