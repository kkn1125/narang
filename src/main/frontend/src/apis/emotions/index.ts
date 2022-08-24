import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 감정 데이터 유저 아이디로 조회
const findEmotionByUid = (uid: string) => {
  return axios
    .get(`/api/emotion/uid/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 감정 데이터 시작~끝 날짜로 조회
const findEmotionByDateRange = (uid: string, start: Date, end: Date) => {
  return axios
    .get(
      `/api/emotion/date/${uid}?start=${start.toISOString()}&end=${end.toISOString()}`,
    )
    .catch(handleReceiveData)
    .catch(handleReceiveError);
};

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

export {
  findEmotionByUid,
  findEmotionByDateRange,
  findEmotionByDid,
  insertEmotions,
  deleteEmotionByDid,
};
