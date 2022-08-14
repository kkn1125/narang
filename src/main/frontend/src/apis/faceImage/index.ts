import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../commonTypes";

// 얼굴 이미지 전체 조회
const findFaceImageAll = () => {
  return axios
    .get("/api/faces")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 얼굴 이미지 단건 조회
const findFaceImageByUid = (id: string) => {
  return axios
    .get(`/api/face/uid/${id}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 얼굴 이미지 추가
const addFaceImage = (formData: FormData) => {
  axios
    .post("/api/face", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 유저 얼굴 이미지 전체 삭제
const deleteFaceImageAll = (uid: string) => {
  axios
    .delete(`/api/face/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

// 얼굴 이미지 단건 삭제
const deleteFaceImageById = (uid: string, ids: string[], imgPath: string) => {
  const faces = new FormData();
  ids.forEach((id) => {
    // 서버단에서 String[]이 아닌 List<String>으로 받기 때문에 name을 동일하게 해서 여러 데이터를 넣는다. 그러면 서버단에서 List로 변환
    faces.append("ids", id);
    faces.append("imgPath", imgPath);
  });

  axios
    .delete(`/api/face/${uid}`, {
      data: faces,
    })
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export {
  findFaceImageAll,
  findFaceImageByUid,
  addFaceImage,
  deleteFaceImageAll,
  deleteFaceImageById,
};
