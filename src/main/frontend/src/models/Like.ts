import {
  IModel,
  ModelBooleanValue,
  ModelData,
  ModelStringValue,
  ModelValue
} from "./IModel";
import { PModel } from "./PModel";

export type LikeColumn =
  | "id"
  | "uid"
  | "did"
  | "isLike"
  | "regdate"
  | "updates"
  | "_class";

export enum LikeColumnStrings {
  id,
  uid,
  did,
  isLike,
  regdate,
  updates,
  _class,
}

class Like extends PModel implements IModel<Like, LikeColumn> {
  private uid: string;
  private did: string;
  private isLike: boolean;

  public set(column: LikeColumn, value: ModelValue): void {
    switch (column) {
      case "uid":
      case "did":
        this[column] = value as ModelStringValue;
        break;
      case "isLike":
        this[column] = value as ModelBooleanValue;
        break;
      default:
        break;
    }
  }

  public setByInputs(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as LikeColumn, value);
    });
  }

  public getResponseData(responseData: Like): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as LikeColumn, value);
    });
  }
}

export default Like;
