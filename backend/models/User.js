import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  profileImage: { type: String },
  tokenAmount: { type: Number, default: 0 }, // The number of tokens the user has
  dateCreated: { type: Date, default: Date.now }, // The date the account was created
  isSubscribed: { type: Boolean, default: false }, // Subscription status
  subscriptionEnd: { type: Date }, // Subscription expiration date
  createdChatbots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chatbot" }],
  level: { type: Number, default: 1 }, // The user's level
  experience: { type: Number, default: 0 }, // The user's experience points
  chatHistory: [
    {
      chatbot: { type: mongoose.Schema.Types.ObjectId, ref: "Chatbot" }, // Reference to the chatbot
      messages: [
        {
          sender: { type: String }, // 'user' or bot's name
          message: String,
          timestamp: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

// Export the models
const User = mongoose.model("User", userSchema);
export default User;
