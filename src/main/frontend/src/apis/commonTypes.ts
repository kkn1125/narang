import { AxiosResponse } from "axios";

// axios methods 타입 지정
export type METHOD = "get" | "post" | "put" | "delete";

export const handleReceiveData = (res: AxiosResponse<any, any>) => res.data;

export const handleReceiveError = (err: { message: any }) => {
  // console.log(err);
};
