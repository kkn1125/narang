import axios, { AxiosResponse } from "axios";
import Diary from "../../models/Diary";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const insertDiary = (formData: FormData) => {
  return axios
    .post("/api/diary", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const updateDiary = (formData: FormData) => {
  return axios
    .put("/api/diary", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findDiaryAll = () => {
  return axios
    .get("/api/diaries")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findDiaryById = (id: string) => {
  return axios
    .get(`/api/diary/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

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
