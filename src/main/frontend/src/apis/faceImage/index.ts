import axios, { AxiosResponse } from "axios";
import FaceImage from "../../models/FaceImage";

const handleReceiveData = (res: AxiosResponse<any, any>): FaceImage | null =>
  res.data as FaceImage;

const handleReceiveError = (err: { message: any }) => {
  console.log(err.message);
};

const findFaceImageAll = () => {
  return axios
    .get("/api/faces")
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const addFaceImage = (formData: FormData) => {
  axios
    .post("/api/face", formData)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteAll = (uid: string) => {
  axios
    .delete(`/api/face/${uid}`)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

const deleteFaceImageById = (uid: string, ids: string[]) => {
  const faces = new FormData();
  ids.forEach((id) => {
    // 서버단에서 String[]이 아닌 List<String>으로 받기 때문에 name을 동일하게 해서 여러 데이터를 넣는다. 그러면 서버단에서 List로 변환
    faces.append("ids", id);
  });

  axios
    .delete(`/api/face/${uid}`, {
      data: faces,
    })
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { findFaceImageAll, addFaceImage, deleteAll, deleteFaceImageById };
