import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 이메일 로그인
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
  const session = await axios
    .post(`/api/user/signin`, formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
  return session;
};

// 회원 로그인
const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  return await checkUserByEmail({ email, password });
};

// 안면 로그인
const faceSignin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return axios
    .post("/api/user/face/signin", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 회원 가입
const signup = (data: FormData) => {
  return axios
    .post("/api/user", data)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 로그아웃
const signout = async (token: string) => {
  const formData = new FormData();
  formData.append("token", token);
  return await axios
    .post("/api/user/signout", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 비밀번호 검증
const checkPassword = async (password: string, id: string) => {
  const formData = new FormData();
  formData.append("password", password);
  formData.append("id", id);
  return await axios
    .post("/api/user/checkpassword", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 토큰 검증
const checkToken = async (token: string) => {
  const formData = new FormData();
  formData.append("token", token);
  return await axios
    .post("/api/token/confirm", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { signin, faceSignin, signup, signout, checkToken, checkPassword };

