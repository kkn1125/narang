import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import User from "../../models/User";
import { METHOD } from "../commonTypes";
import { USER_URL } from "../user/types";

const handleReceiveData = (res: AxiosResponse<any, any>): User | null =>
  res.data as User;

const handleReceiveError = (err: { message: any }) => {
  console.log(err.message);
};

// 회원 인증 관련 api 메서드
const signup = (data: FormData) => {
  axios[USER_URL["INSERT"].method as METHOD](USER_URL["INSERT"].url, data)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { signup };
