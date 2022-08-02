import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const insertComment = (formData: FormData) => {
  axios
    .post("/api/comment", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertComment };
