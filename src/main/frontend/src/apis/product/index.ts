import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 상품 추가
const insertProduct = (formData: FormData) => {
  return axios
    .post("/api/product", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 상품 전체 조회
const findAllProduct = () => {
  return axios
    .get("/api/products")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 상품 단건 조회
const findProductById = (pid: string) => {
  return axios
    .get(`/api/product/${pid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 상품 단건 삭제
const deleteProduct = (pid: string) => {
  return axios
    .delete(`/api/product/${pid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertProduct, findAllProduct, findProductById, deleteProduct };

