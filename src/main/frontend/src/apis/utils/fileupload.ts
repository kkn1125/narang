import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const fileupload = (file: File, id: string, hashName: string) => {
  const formData = new FormData();
  formData.append("multipartFile", file);
  formData.append("id", id);
  formData.append("hashName", hashName);
  axios
    .post("/api/fileupload", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { fileupload };
