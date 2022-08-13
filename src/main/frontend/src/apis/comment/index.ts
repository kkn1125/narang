import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 댓글 전체 조회
const findCommentAll = () => {
  return axios
    .get("/api/comments")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 댓글 단건 조회
const findCommentByDid = (did: string) => {
  return axios
    .get(`/api/comment/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 댓글 추가
const insertComment = (formData: FormData) => {
  return axios
    .post("/api/comment", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 댓글 수정
const updateCommentById = (formData: FormData) => {
  return axios
    .put("/api/comment", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 댓글 삭제
const deleteCommentById = (id: string) => {
  return axios
    .delete(`/api/comment/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export {
  findCommentAll,
  findCommentByDid,
  insertComment,
  updateCommentById,
  deleteCommentById,
};

