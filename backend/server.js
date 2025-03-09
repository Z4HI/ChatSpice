import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import createUser from "./createUser.js";
import User from "./models/User.js";
import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import uploadRoute from "./routes/upload.js";
import createBot from "./routes/createBot.js";
import Bot from "./models/BotSchema.js";
import BotPgae from "./routes/BotPageRoute.js";
import deleteBot from "./routes/deleteBotRoute.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
connectToDatabase();

app.use("/upload", uploadRoute);
app.use("/BotPage", BotPgae);
app.use("/deleteBot", deleteBot);

const runpodURL = "https://v9j4bl0t6y1bij-8000.proxy.runpod.net/generate";
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
app.post("/createChatBot", async (req, res) => {
  try {
    const data = req.body;
    const newBot = await createBot(data);
    const user = await User.findOne({ username: data.createdBy });
    user.createdChatbots.push(newBot._id);
    await user.save();
    return res.status(201).json({ message: "Bot created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/GetUserInfo", async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});
app.get("/getMyBots/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    const bots = await Bot.find({ createdBy: user.username });
    res.status(200).json(bots);
  } catch (error) {
    console.error("Error fetching user bots:", error);
    res.status(500).json({ message: "Failed to fetch bots" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
