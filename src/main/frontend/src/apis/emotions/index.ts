import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 감정 데이터 단건 조회
const findEmotionByDid = (did: string) => {
  return axios
    .get(`/api/emotion/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 감정 데이터 추가
const insertEmotions = (formData: FormData) => {
  return axios
    .post("/api/emotion", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 감정 데이터 삭제
const deleteEmotionByDid = (did: string) => {
  return axios
    .delete(`/api/emotion/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { findEmotionByDid, insertEmotions, deleteEmotionByDid };
