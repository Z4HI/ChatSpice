import express from "express";
import Bot from "../models/BotSchema.js";
import User from "../models/User.js";
const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const botId = req.params.id; // ID from the request parameters
    const user = await User.findOneAndUpdate(
      { createdChatbots: botId }, // Find the user by botId
      { $pull: { createdChatbots: botId } }, // Pull the botId from the createdChatBots array
      { new: true } // Returns the updated document
    );

    const bot = await Bot.findByIdAndDelete(botId); // Find and delete the bot by ID
    res
      .status(200)
      .json({ message: "Bot deleted", createdChatBots: user.createdChatbots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
