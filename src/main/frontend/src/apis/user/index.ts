import axios from "axios";
import { decodeJwt } from "jose";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 토큰의 이메일로 회원 정보 얻기
const findByJwt = async (token: string) => {
  try {
    const email = decodeJwt(token).sub;
    return await axios
      .get(`/api/user/email/${encodeURIComponent(email)}`)
      .then(handleReceiveData)
      .catch(handleReceiveError);
  } catch (e) {
    return false;
  }
};

// 회원 전체 조회
const findUserAll = async () => {
  return await axios
    .get(`/api/users`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 회원 단건 조회
const findUserById = async (id: string) => {
  return await axios
    .get(`/api/user/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const findUserByNickNames = async (formData: FormData) => {
  return await axios
    .post(`/api/user/nicknames`, formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 회원 수정
const userUpdate = (formData: FormData) => {
  return axios
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

export {
  findUserAll,
  findUserById,
  findUserByNickNames,
  userUpdate,
  userDeleteById,
  findByJwt,
};

