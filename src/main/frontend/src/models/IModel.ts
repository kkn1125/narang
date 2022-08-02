// 각 클래스마다 재정의가 필요하고 공통으로 가져야하는 함수 정의
// T는 해당 클래스, U는 해당 클래스의 ColumnType을 지정한다.
// 즉, 각 모델 클래스는 최소 아래 5개 함수는 가지고 있어야 한다는 의미.
export interface IModel<T, U> {
  set: (column: U, value: ModelValue) => void;
  setByInputs: (inputs: HTMLInputElement[]) => void;
  get: (column: U) => ModelValue;
  getResponseData?: (responseData: T) => void;
  makeFormData: (modelDatas: ModelData[]) => FormData;
}

// 모델 클래스 필드, 값 튜플 타입
export type ModelData = [string, ModelValue];
// 모델 클래스 string 값
export type ModelStringValue = string | null;
// 모델 클래스 number 값
export type ModelNumberValue = number;
// 모델 클래스 boolean 값
export type ModelBooleanValue = boolean;
// 모델 클래스 모든 값
export type ModelValue =
  | ModelStringValue
  | ModelNumberValue
  | ModelBooleanValue
  | Date;

// 일기 필드명 타입
export type DiaryColumn =
  | "_id"
  | "title"
  | "content"
  | "author"
  | "regdate"
  | "updates"
  | "isShare";

// 일기 필드명 enums
export enum DiaryColumnStrings {
  _id,
  title,
  content,
  author,
  regdate,
  updates,
  isShare,
}
