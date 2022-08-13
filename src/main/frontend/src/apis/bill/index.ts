import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 카트 추가
const insertBill = (formData: FormData) => {
  return axios
    .post("/api/bill", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 카트 전체 조회
const findAllBill = () => {
  return axios
    .get("/api/bills")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 카트 단건 조회
const findBillById = (uid: string) => {
  return axios
    .get(`/api/bills/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { insertBill, findAllBill, findBillById };
