import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 일기 추가
const insertDiary = (formData: FormData) => {
  return axios
    .post("/api/diary", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 일기 수정
const updateDiary = (formData: FormData) => {
  return axios
    .put("/api/diary", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 일기 전체 조회
const findDiaryAll = () => {
  return axios
    .get("/api/diaries")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 일기 단건 조회
const findDiaryById = (id: string) => {
  return axios
    .get(`/api/diary/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 일기 단건 삭제
const deleteDiaryById = (id: string) => {
  return axios
    .delete(`/api/diary/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export {
  insertDiary,
  updateDiary,
  findDiaryAll,
  findDiaryById,
  deleteDiaryById,
};
