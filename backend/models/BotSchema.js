const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chatbot = mongoose.model("Chatbot", chatbotSchema);
module.exports = Chatbot;
