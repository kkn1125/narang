import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 좋아요 단건 조회
const findLikeByDid = (did: string) => {
  return axios
    .get(`/api/like/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 좋아요 추가
const addLike = (formData: FormData) => {
  axios
    .post("/api/like", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 좋아요 삭제
const deleteLikeById = (id: string) => {
  axios
    .delete(`/api/like/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 좋아요 삭제
const deleteLikeByUid = (uid: string) => {
  axios
    .delete(`/api/like/uid/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 좋아요 삭제
const deleteLikeByDid = (did: string, formData: FormData) => {
  axios
    .delete(`/api/like/did/${did}`, {
      data: formData,
    })
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export {
  findLikeByDid,
  addLike,
  deleteLikeById,
  deleteLikeByUid,
  deleteLikeByDid,
};
