import { IModel, ModelData, ModelStringValue, ModelValue } from "./IModel";
import { PModel } from "./PModel";

// 얼굴이미지 필드명 타입
export type FaceImageColumn =
  | "id"
  | "uid"
  | "imgPath"
  | "regdate"
  | "updates"
  | "_class";

// 얼굴이미지 필드명 enums
export enum FaceImageColumnStrings {
  id,
  uid,
  imgPath,
  regdate,
  updates,
  _class,
}

class FaceImage extends PModel implements IModel<FaceImage, FaceImageColumn> {
  private uid: ModelStringValue;
  private imgPath: ModelStringValue;

  public set(column: FaceImageColumn, value: ModelValue) {
    switch (column) {
      case "uid":
      case "imgPath":
        this[column] = (value as ModelStringValue) || "";
        break;
      default:
        break;
    }
  }

  public setByInputs(inputs: HTMLInputElement[]) {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as FaceImageColumn, value);
    });
  }

  public getResponseData(responseData: FaceImage): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as FaceImageColumn, value);
    });
  }
}

export default FaceImage;
