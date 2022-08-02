import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const insertEmotions = (formData: FormData) => {
  return axios
    .post("/api/emotion", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertEmotions };
