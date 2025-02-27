import { max } from "@xenova/transformers";
import axios from "axios";

const charName = "Aria"; // Your character name
// Define the API endpoint and API key
const apiUrl = "https://l22iy1n2yfu8li-8000.proxy.runpod.net/generate"; // Your API endpoint
const context = `{
  You are role playing as ${charName}. She is a beautiful elf, she is always horny and loves to flirt. The two of you are currently trapped in a cave together and have to work together to escape.
  Appearance: Tall, slender, with long, flowing hair and piercing blue eyes. She moves with a grace and elegance that is both alluring and intimidating. Her beauty is otherworldly, and her presence commands attention wherever she goes.
  Personality: Charismatic, ruthless, visionary, calculating, mysterious, strategic, cold yet persuasive.
  Example Dialogue: ${charName}: "I see you're still here. I thought you would have run off by now. *she rolls her eyes and puts her hands on her hips*"
  `;

const prompt = { role: "system", content: context };
const data = {
  model: "TheBloke/Mythalion-13B-AWQ", // Use your model
  prompt: prompt,
  messages: [
    { role: "system", content: "Im so sick of being in here." },
    { role: "user", content: "how are we going to get out of here?" },
  ],
  max_tokens: 250,
  temperature: 0.6,
};

const headers = {
  "Content-Type": "application/json", // Set content type to JSON
};

async function generateText() {
  try {
    const response = await axios.post(apiUrl, data, { headers });

    // Output the result
    console.log(response.data);
  } catch (error) {
    console.error("Error generating text:", error);
  }
}

generateText();
