import {
  IModel,
  ModelBooleanValue,
  ModelData,
  ModelStringValue,
  ModelValue
} from "./IModel";
import { PModel } from "./PModel";

export type DiaryColumn =
  | "id"
  | "uid"
  | "title"
  | "content"
  | "author"
  | "isShare"
  | "regdate"
  | "updates"
  | "_class";

export enum DiaryColumnStrings {
  id,
  uid,
  title,
  content,
  author,
  isShare,
  regdate,
  updates,
  _class,
}

class Diary extends PModel implements IModel<Diary, DiaryColumn> {
  private uid: string;
  private title: string;
  private content: string;
  private author: string;
  private isShare: boolean;

  // setter
  public set(column: DiaryColumn, value: ModelValue) {
    switch (column) {
      case "uid":
      case "title":
      case "content":
      case "author":
        this[column] = (value as ModelStringValue) || "";
        break;
      case "isShare":
        this[column] = value as ModelBooleanValue;
        break;
      default:
        break;
    }
  }

  // input list로 객체 값 해당 필드에 자동 할당
  public setByInputs(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as DiaryColumn, value);
    });
  }

  // axios response로 객체 값 해당 필드에 자동 할당
  public getResponseData(responseData: Diary): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as DiaryColumn, value);
    });
  }
}

export default Diary;
