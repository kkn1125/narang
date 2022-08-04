import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const findEmotionByDid = (did: string) => {
  return axios
    .get(`/api/emotion/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};
const insertEmotions = (formData: FormData) => {
  return axios
    .post("/api/emotion", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};
const deleteEmotionByDid = (did: string) => {
  return axios
    .delete(`/api/emotion/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { findEmotionByDid, insertEmotions, deleteEmotionByDid };
