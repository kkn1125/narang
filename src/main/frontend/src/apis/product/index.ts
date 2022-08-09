import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const insertProduct = (formData: FormData) => {
  return axios
    .post("/api/product", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findAllProduct = () => {
  return axios
    .get("/api/products")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findProductById = (pid: string) => {
  return axios
    .get(`/api/product/${pid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteProduct = (pid: string) => {
  return axios
    .delete(`/api/product/${pid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertProduct, findAllProduct, findProductById, deleteProduct };
