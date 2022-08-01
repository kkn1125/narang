import { ModelValue } from "../models/IModel";
import * as yup from "yup";

const upperCase = (text: string) => text.toUpperCase();
const splitToUnderBar = (text: string) => text.split(/[\s]/g).join("_");
const capitalize = (text: string): string =>
  text
    .split(/\s|_|-|\./g)
    .map((_) => _[0].toUpperCase().concat(_.slice(1)))
    .join(" ");

const mapToQuery = (maps: Map<string, ModelValue>): string => {
  const mapped = maps.entries();
  let stringBuilder = [];
  while (true) {
    const {
      value: [key, value],
    } = mapped.next();
    stringBuilder.push(`${key}=${value}`);
    if (mapped.next().done) break;
  }

  return stringBuilder.join("&");
};

const nickNameValidation = yup
  .string()
  .matches(
    /^([A-z]+([0-9]*))+$/g,
    "닉네임은 영문+숫자 조합으로 영문자로 시작해야합니다. 그 외 특수문자는 허용되지 않습니다."
  )
  .min(5, "최소 5글자 이상이어야 합니다.")
  .max(15, "최대 15글자 이내여야 합니다.")
  .required("닉네임은 필수 항목 입니다.");
const emailValidation = yup
  .string()
  .matches(
    /^([A-z]+([0-9]*))+\@[A-z]{2,}(\.[A-z]{2,}){1,}$/g,
    "이메일 형식과 맞지 않습니다."
  )
  .required("이메일은 필수 항목 입니다.");
const passwordValidation = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
    "비밀번호는 숫자 + 대문자 + 특수문자로 구성되어야 합니다. (대문자 및 특수문자는 최소 1자 이상 포함되어야 합니다."
  )
  .required("이메일은 필수 항목 입니다.");
const phoneValidation = yup
  .string()
  .matches(
    /^[0-9]{2,4}(-[0-9]{3,5}){2,3}$/,
    "전화번호 형식과 일치하지 않습니다."
  );

export const AVAILABLE_FILE_TYPE = ["JPG", "PNG", "GIF", "MP4", "WEBM"];

// yup 에러 메세지
export const REQUIRED_ERROR = "필수항목 입니다.";
export const FILE_MODIFIED_ERROR = "파일의 수정시간이 잘못 되었습니다.";
export const FILE_WEBKIT_PATH_ERROR = "상대경로가 잘못 되었습니다.";
export const FILE_INSERT_TIME_ERROR = "파일 등록 일자가 잘못 되었습니다.";

export const FILE_NAME_REGEXP = /(?=.+)\.(jp.?g|png|gif|webm|mp4)/i;
export const FILE_TYPE_REGEXP = /image\/(jpg|jpeg|png|gif|mp4|webm)/i;
export const FILE_NAME_ERROR = "파일명은 문자여야 합니다.";
export const FILE_SIZE_ERROR = "파일 크기가 잘못되었습니다.";
export const FILE_TYPE_ERROR = `파일형식이 다릅니다. 가능한 형식은 ${AVAILABLE_FILE_TYPE.join(
  ", "
)} 입니다.`;

export {
  upperCase,
  splitToUnderBar,
  capitalize,
  mapToQuery,
  nickNameValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
};
