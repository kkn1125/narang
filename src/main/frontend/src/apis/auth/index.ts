import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import User from "../../models/User";
import { handleReceiveData, handleReceiveError, METHOD } from "../commonTypes";
import { USER_URL } from "../user/types";


// 회원 인증 관련 api 메서드
const signup = (data: FormData) => {
  return axios[USER_URL["INSERT"].method as METHOD](
    USER_URL["INSERT"].url,
    data
  )
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { signup };
