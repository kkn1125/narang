import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const insertBill = (formData: FormData) => {
  return axios
    .post("/api/bill", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findAllBill = () => {
  return axios
    .get("/api/bills")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findBillById = (uid: string) => {
  return axios
    .get(`/api/bills/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertBill, findAllBill, findBillById };
