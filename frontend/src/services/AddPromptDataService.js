import axios from "axios";
import { CURRENT_API_URL } from "../utils/constant";

const AddPromptDataService = (prompt, response) => {
  return axios
    .post(`${CURRENT_API_URL}/save`, {
      prompt,
      response,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error saving response:", error);
      throw error;
    });
};

export default AddPromptDataService;
