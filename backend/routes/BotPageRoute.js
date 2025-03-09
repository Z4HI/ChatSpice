import express from "express";
import Bot from "../models/BotSchema.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const bot = await Bot.findById(req.params.id);

    if (!bot) {
      return res.status(404).json({ message: "Bot not found" });
    }
    res.json(bot);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
