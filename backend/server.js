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
app.use(cors());
app.use(express.json());
connectToDatabase();
const OOBABOOGA_API_URL = process.env.OOBABOOGA_API_URL;
app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      `${OOBABOOGA_API_URL}`,
      req.body.data,
      req.body.headers
    );

    return res.json(response.data);
  } catch (err) {
    return res.send(err);
  }
});
//OAuth 2.0
app.post("/oauth/google", async (req, res) => {
  console.log(req.body.email);
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser && existingUser.username) {
      return res.json({ hasUsername: true });
    }
    return res.json({ hasUsername: false });
  } catch (error) {
    console.error(error);
  }
});

app.post("/checkUsername", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    // If username is taken
    return res.status(400).json({ message: "Username is already taken" });
  } else {
    // If username is available
    return res.status(200).json({ message: "Username is available" });
  }
});

app.post("/createUser", async (req, res) => {
  console.log(req.body);
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
