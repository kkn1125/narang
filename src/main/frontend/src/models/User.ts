import {
  IModel,
  ModelBooleanValue,
  ModelData,
  ModelNumberValue,
  ModelStringValue,
  ModelValue,
} from "./IModel";
import { PModel } from "./PModel";

// 유저 필드 타입
export type UserColumn =
  | "_id"
  | "nickName"
  | "email"
  | "password"
  | "profileImg"
  | "phone"
  | "isFaceSign"
  | "terms"
  | "regdate"
  | "updates"
  | "_class";

// 유저 필드명 enums
export enum UserColumnStrings {
  _id,
  nickName,
  email,
  password,
  profileImg,
  phone,
  isFaceSign,
  terms,
  regdate,
  updates,
  _class,
}

class User extends PModel implements IModel<User, UserColumn> {
  private nickName: ModelStringValue = "";
  private email: ModelStringValue = "";
  private password: ModelStringValue = "";
  private profileImg: ModelStringValue = "";
  private phone: ModelStringValue = "";
  private isFaceSign: ModelBooleanValue = false;
  private terms: ModelBooleanValue = false;

  // setter
  public set(column: UserColumn, value: ModelValue) {
    switch (column) {
      case "nickName":
      case "email":
      case "password":
      case "profileImg":
      case "phone":
        this[column] = (value as ModelStringValue) || "";
        break;
      case "isFaceSign":
      case "terms":
        this[column] = value as ModelBooleanValue;
        break;
      case "regdate":
      case "updates":
        this[column] = value as ModelNumberValue;
        break;
      default:
        break;
    }
  }

  // getter
  public get(column: UserColumn): ModelValue {
    return this[column];
  }

  // input list로 객체 값 해당 필드에 자동 할당
  public setByInputs(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const column: UserColumn = input.name as UserColumn;
      const value = input.value;
      const checked = input.checked;
      switch (column) {
        case "isFaceSign":
        case "terms":
          this.set(column, checked);
          break;
        case "regdate":
        case "updates":
          this.set(column, value);
          break;
        default:
          this.set(column, value || "");
          break;
      }
    });
  }

  // axios response로 객체 값 해당 필드에 자동 할당
  public getResponseData(responseData: User): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as UserColumn, value);
    });
  }

  // 현재 객체 필드에 할당된 값으로 formData 생성
  public makeFormData(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([column, value]: ModelData) => {
      switch (typeof value) {
        case "number":
          this.set(column as UserColumn, value.toString());
          break;
        case "boolean":
          this.set(column as UserColumn, value.toString());
          break;
        default:
          this.set(column as UserColumn, value || "");
          break;
      }
    });
    return formData;
  }
}

export default User;
