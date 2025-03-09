import Bot from "../models/BotSchema.js";
import connectToDatabase from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

const createBot = async (data) => {
  try {
    const newBot = new Bot({
      createdBy: data.createdBy,
      charName: data.charName,
      description: data.description,
      scenario: data.scenario,
      gender: data.gender,
      body: data.body,
      personality: data.personality,
      clothing: data.clothing,
      greeting: data.greeting,
      image: data.image, // Ensure image URL is passed
      tags: data.tags,
      nsfw: data.sensitive || false,
      public: data.publicView || false,
    });
    await newBot.save();
    return newBot;
  } catch (error) {
    console.log(error);
  }
};

export default createBot;
