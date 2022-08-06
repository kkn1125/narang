import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import User from "../../models/User";
import { handleReceiveData, handleReceiveError, METHOD } from "../commonTypes";
import { USER_URL } from "../user/types";

const checkUserByNickName = async (nickName: string) => {
  const findUserByNickName = await axios[
    USER_URL["FIND_BY_NICKNAME"].method as METHOD
  ](`${USER_URL["FIND_BY_NICKNAME"].url}/${nickName}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
  console.log(findUserByNickName);
};

const checkUserByEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  console.log(email, password);
  const session = await axios[USER_URL["SIGNIN_BY_EMAIL"].method as METHOD](
    `${USER_URL["SIGNIN_BY_EMAIL"].url}`,
    formData,
  )
    .then(handleReceiveData)
    .catch(handleReceiveError);
  console.log(session);

  return session;
};

// 회원 로그인
const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await checkUserByEmail({ email, password });
};

// 회원 가입
const signup = (data: FormData) => {
  return axios[USER_URL["INSERT"].method as METHOD](
    USER_URL["INSERT"].url,
    data,
  )
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const signout = async (token: string) => {
  const formData = new FormData();
  formData.append("token", token);
  return await axios
    .post("/api/user/signout", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const checkToken = async (token: string) => {
  const formData = new FormData();
  formData.append("token", token);
  return await axios
    .post("/api/token/confirm", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { signin, signup, signout, checkToken };
