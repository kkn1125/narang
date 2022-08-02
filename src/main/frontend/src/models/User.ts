import {
  IModel,
  ModelBooleanValue,
  ModelData,
  ModelStringValue,
  ModelValue,
} from "./IModel";
import { PModel } from "./PModel";

// 유저 필드 타입
export type UserColumn =
  | "id"
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
  id,
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
    console.log("set:", column, value);
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
      const { name, value } = input;
      this.set(name as UserColumn, value);
    });
  }

  // axios response로 객체 값 해당 필드에 자동 할당
  public getResponseData(responseData: User): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as UserColumn, value);
    });
  }
}

export default User;
