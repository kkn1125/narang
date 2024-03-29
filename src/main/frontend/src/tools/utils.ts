import * as yup from "yup";
import { ModelValue } from "../models/IModel";

const logoWidth = 140;
const calc = (width: number) => (width * 166) / 500;

export const LOGO_SHORT = "/logo/narang-color-short.png";
export const LOGO_FULL = "/logo/narang-color-full.png";
export const LOGO_STYLE = {
  // width: logoWidth,
  height: calc(logoWidth),
  objectFit: "contain",
};

export const nickNameValidation = yup
  .string()
  .matches(
    /^([A-z]+([0-9]*))+$/g,
    "닉네임은 영문+숫자 조합으로 영문자로 시작해야합니다. 그 외 특수문자는 허용되지 않습니다.",
  )
  .min(5, "최소 5글자 이상이어야 합니다.")
  .max(15, "최대 15글자 이내여야 합니다.")
  .required("닉네임은 필수 항목 입니다.");
export const emailValidation = yup
  .string()
  .matches(
    /^([A-z_.\-0-9]+)+\@[A-z]{2,}(\.[A-z]{2,}){1,}$/g,
    "이메일 형식과 맞지 않습니다.",
  )
  .required("이메일은 필수 항목 입니다.");
export const passwordValidation = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
    "비밀번호는 숫자 + 소문자 + 대문자 + 특수문자로 구성되어야 합니다. (대문자 및 특수문자는 최소 1자 이상 포함되어야 합니다.",
  )
  .required("이메일은 필수 항목 입니다.");
export const phoneValidation = yup
  .string()
  .matches(
    /^[0-9]{2,4}(-[0-9]{3,5}){2,3}$/,
    "전화번호 형식과 일치하지 않습니다. ex) 010-0000-0000",
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
  ", ",
)} 입니다.`;

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

const convertLongToDate = (time: number | number[]): string => {
  let timezoneOffset = new Date().getTimezoneOffset() * 60000;
  let timezoneDate;

  let date = new Date();
  try {
    if (typeof time === "number") {
      // console.log("숫자", time, timezoneOffset);
      timezoneDate = new Date(
        new Date(time).getTime() -
          (process.env.NODE_ENV === "production" ? timezoneOffset : 0),
      );
    } else {
      // console.log("숫자 아님", time);
      const [year, month, day, hours, minutes, seconds, milliseconds] = time;
      date.setFullYear(year);
      date.setMonth(month);
      date.setDate(day);
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      date.setMilliseconds(milliseconds);
      timezoneDate = new Date(date.getTime() - timezoneOffset);
    }
  } catch (e) {
    return null;
  } finally {
    return timezoneDate.toLocaleString("ko", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });
  }
};

const isEmpty = (object: object): boolean => Object.keys(object).length === 0;

const profileImageOrCat = (user: any) => {
  let prefix = (user: any) => `/images/profiles/${user.id}/${user.profileImg}`;
  let path;
  try {
    if (user && user.id && user.profileImg) {
      path = prefix(user);
    }
  } catch (e) {
    path = "http://placekitten.com/300/200";
    // console.log(e);
  } finally {
    return path;
  }
};

const uploadImageOrNull = (user: any) => {
  let prefix = (user: any) =>
    (process.env.NODE_ENV === "production" ? `https://narang.ml` : "") +
    `/images/upload/${user.uid}/${user.imgPath}`;
  let path;
  try {
    if (user && user.uid && user.imgPath) {
      path = prefix(user);
    }
  } catch (e) {
    // console.log(e);
  } finally {
    return path;
  }
};

const reverse = (arr: any[]) =>
  arr.reduce((acc, cur) => {
    acc.unshift(cur);
    return acc;
  }, []);

const cutMiddleText = (text: string) => {
  let temp = text;
  if (text.length > 50) {
    temp = text.substring(0, 10);
    temp += `...`;
    temp += text.substring(text.length - 11, text.length - 1);
  }
  return temp;
};

const getSearchQueryToMap = () =>
  new Map<any, string>(
    location.search
      .slice(1)
      .split("&")
      .map((q: any) => q.split("=")),
  );

const formDataToQuery = (formData: FormData) => {
  let query = "";
  let idx = 0;
  formData.forEach((value: FormDataEntryValue, key: string) => {
    query += `${idx > 0 ? "&" : ""}${key}=${value}`;
    idx++;
  });
  return query;
};

const getWeeks = (startDate: Date) => {
  const newDate = new Date(startDate);
  const weeks = [];
  let i;
  for (i = 0; i < 7; i++) {
    if (i === 0) weeks.push(new Date(newDate.setDate(newDate.getDate())));
    else weeks.push(new Date(newDate.setDate(newDate.getDate() + 1)));
  }
  return weeks;
};

// 한 주 시간 배열로 받아 포맷 맞춰서 텍스트로 변환
const getWeekFormat = (weeks: Date[]): string[] =>
  weeks.map((week) => `${week.getMonth() + 1}/${week.getDate()}`);

// Card Dummy 배열
const dummies = new Array(10).fill(0);

const randomSize = ["640/400", "640/300", "640/500", "640/600"];

const getRandImg = () => {
    const size =
      randomSize[parseInt((Math.random() * 3).toString())].split("/");
    const [width, height] = size;
    return {
      width,
      height,
      src: `https://picsum.photos/seed/${parseInt(
        (Math.random() * 1000).toString(),
      )}/${size.join("/")}`,
    };
  };

export {
  dummies,
  getRandImg,
  getWeeks,
  getWeekFormat,
  upperCase,
  splitToUnderBar,
  capitalize,
  mapToQuery,
  convertLongToDate,
  isEmpty,
  profileImageOrCat,
  uploadImageOrNull,
  reverse,
  cutMiddleText,
  getSearchQueryToMap,
  formDataToQuery,
};
