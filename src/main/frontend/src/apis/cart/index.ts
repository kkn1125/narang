import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 카트 추가
const insertCart = (formData: FormData) => {
  return axios
    .post("/api/cart", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 카트 전체 조회
const findAllCart = () => {
  return axios
    .get("/api/carts")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 카트 단건 조회
const findCartById = (cid: string) => {
  return axios
    .get(`/api/carts/${cid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 카트 단건 삭제
const deleteCart = (cid: string) => {
  return axios
    .delete(`/api/cart/${cid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertCart, findAllCart, findCartById, deleteCart };

