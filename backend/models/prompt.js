import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  prompt: String,
  response: String,
  createdAt: { type: Date, default: Date.now }

});

export default mongoose.model("Prompt", PromptSchema);
