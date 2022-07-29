import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SERVER_HOST, SERVER_PORT } from "../envPath";

const serverAuthPath = `http://${SERVER_HOST}:${SERVER_PORT}`;

enum URL {
  SIGNUP = "/api/user",
}

type UrlType = "SIGNUP";

const handleReceiveData = (res: AxiosResponse<any, any>): void => {
  console.log(res.data);
};

const handleReceiveError = (err: { message: any }) => {
  console.log(err.message);
};

const authApi = (
  url: UrlType,
  data: FormData,
  options?: AxiosRequestConfig<any>
) => {
  axios
    .post(URL[url], data, options)
    .then(handleReceiveData)
    .catch(handleReceiveError);
};

export { authApi };
