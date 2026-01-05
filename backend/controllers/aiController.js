import { OpenRouter } from "@openrouter/sdk";
import Prompt from "../models/prompt.js";


export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const openrouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY
    });

    const completion = await openrouter.chat.send({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Respond ONLY in plain text. Do not include tags, brackets, tokens, examples, or explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    let answer = completion.choices[0].message.content;
    answer = answer
      .replace(/<\/?s>/g, "")
      .replace(/\[\/?RESPONSE\]/gi, "")
      .replace(/###.*$/gs, "")
      .replace(/\n+/g, " ")
      .trim();
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI response failed" });
  }
};

export const savePrompt = async (req, res) => {
  const data = await Prompt.create(req.body);
  res.json(data);
};
