import axios from "axios";
import Like from "../../models/Like";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

const findByDid = (did: string) => {
  return axios
    .get(`/api/like/did/${did}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const addLike = (formData: FormData) => {
  axios
    .post("/api/like", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteLikeById = (id: string) => {
  axios
    .delete(`/api/like/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteLikeByUid = (uid: string) => {
  axios
    .delete(`/api/like/uid/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteLikeByDid = (did: string, formData: FormData) => {
  axios
    .delete(`/api/like/did/${did}`, {
      data: formData,
    })
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { findByDid, addLike, deleteLikeById, deleteLikeByUid, deleteLikeByDid };
