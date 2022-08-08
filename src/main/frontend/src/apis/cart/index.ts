import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const insertCart = (formData: FormData) => {
  return axios
    .post("/api/cart", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findAllCart = () => {
  return axios
    .get("/api/carts")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findCartById = (cid: string) => {
  return axios
    .get(`/api/carts/${cid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteCart = (cid: string) => {
  return axios
    .delete(`/api/cart/${cid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertCart, findAllCart, findCartById, deleteCart };
