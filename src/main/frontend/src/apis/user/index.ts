import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { decodeJwt } from "jose";
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

const findByJwt = async (token: string) => {
  try {
    const email = decodeJwt(token).sub;
    // console.log(email)
    return await axios
      .get(`/api/user/email/${email}`)
      .then(handleReceiveData)
      .catch(handleReceiveError);
  } catch (e) {
    return false;
  }
};

const findUserAll = async () => {
  return await axios
    .get(`/api/users`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findUserById = async (id: string) => {
  return await axios
    .get(`/api/user/${id}`)
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
const userDeleteById = async (id: string) => {
  return await axios
    .delete(`/api/user/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { findUserAll, findUserById, userUpdate, userDeleteById, findByJwt };
