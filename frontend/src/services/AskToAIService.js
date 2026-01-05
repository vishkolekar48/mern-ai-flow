import axios from "axios";
import { CURRENT_API_URL } from "../utils/constant";

const AskToAIService = (prompt) => {
  return axios
    .post(`${CURRENT_API_URL}/ask-ai`, {
      prompt
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error saving response:", error);
      throw error;
    });
};

export default AskToAIService;
