import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
  createdBy: { type: String },
  charName: { type: String, required: true },
  description: { type: String, required: true },
  scenario: { type: String, required: true },
  gender: { type: String, required: true },
  body: { type: String },
  personality: { type: String },
  clothing: { type: String },
  greeting: { type: String },
  image: { type: String },
  tags: [{ type: String }],
  nsfw: { type: Boolean, default: false },
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chatbot = mongoose.model("Chatbot", chatbotSchema);

export default Chatbot;
