export interface IModel<T, U> {
  set: (column: U, value: ModelValue) => void;
  setByInputs: (inputs: HTMLInputElement[]) => void;
  get: (column: U) => ModelValue;
  getMap: () => Map<string, ModelValue>;
  log: (t: T) => void;
  getInputData?: (target: EventTarget) => HTMLInputElement[];
  makeFormData: (modelDatas: ModelData[]) => FormData;
}

export type ModelData = [string, ModelValue];

export type ModelStringValue = string | null;
export type ModelBooleanValue = boolean;
export type ModelValue = ModelStringValue | ModelBooleanValue;

// user model column
export type UserColumn =
  | "_id"
  | "nickName"
  | "email"
  | "password"
  | "profileImg"
  | "phone"
  | "isFaceSign"
  | "terms";
// faceImage model column
export type FaceImageColumn = "_id" | "imgPath" | "regdate";
// diary model column
export type DiaryColumn =
  | "_id"
  | "title"
  | "content"
  | "author"
  | "regdate"
  | "updates"
  | "isShare";
