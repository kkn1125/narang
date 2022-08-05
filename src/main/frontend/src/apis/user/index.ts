import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import User from "../../models/User";
import { mapToQuery } from "../../tools/utils";
import { METHOD } from "../commonTypes";
import {
  Params,
  UserDELETE,
  UserGET,
  UserPOST,
  UserPUT,
  USER_URL,
} from "./types";

const handleReceiveData = (res: AxiosResponse<any, any>): User | null =>
  res.data as User;

const handleReceiveError = (err: { message: any }) => {
  console.log(err.message);
};

const userApi = (
  url: UserGET | UserPOST | UserPUT | UserDELETE,
  params?: Params,
  options?: AxiosRequestConfig<any>
) => {
  const parameters = [];

  if (url !== "FIND_ALL") {
    if (params.querys) {
      const q = mapToQuery(params.querys);
      parameters.push(q);
    }
    if (params.pathVariable) {
      parameters.push(params.pathVariable);
    }
  }

  return axios[USER_URL[url].method as METHOD](
    USER_URL[url].url +
      (url !== "FIND_ALL"
        ? (params.querys ? "?" : "/") + parameters.pop()
        : ""),
    options
  )
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 회원 수정
const userUpdate = (formData: FormData) => {
  axios
    .put(`/api/user`, formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 회원 탈퇴

export { userApi, userUpdate };
