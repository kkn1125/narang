import {
  IModel,
  ModelData,
  ModelNumberValue,
  ModelStringValue,
  ModelValue,
} from "./IModel";
import { PModel } from "./PModel";

// 얼굴이미지 필드명 타입
export type FaceImageColumn = "_id" | "imgPath" | "regdate";

// 얼굴이미지 필드명 enums
export enum FaceImageColumnStrings {
  _id,
  imgPath,
  regdate,
}

class FaceImage extends PModel implements IModel<FaceImage, FaceImageColumn> {
  private imgPath: ModelStringValue;

  public set(column: FaceImageColumn, value: ModelValue) {
    switch (column) {
      case "_id":
      case "imgPath":
        this[column] = (value as ModelStringValue) || "";
        break;
      case "regdate":
        this[column] = value as ModelNumberValue;
        break;
      default:
        break;
    }
  }

  public setByInputs(inputs: HTMLInputElement[]) {
    inputs.forEach((input) => {
      const column: FaceImageColumn = input.name as FaceImageColumn;
      const value = input.value;
      this.set(column, value);
    });
  }

  public get(column: FaceImageColumn): ModelValue {
    return this[column];
  }

  public getResponseData(responseData: FaceImage): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as FaceImageColumn, value);
    });
  }

  public makeFormData(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([column, value]: ModelData) => {
      switch (typeof value) {
        case "number":
          this.set(column as FaceImageColumn, value.toString());
          break;
        case "boolean":
          this.set(column as FaceImageColumn, value.toString());
          break;
        default:
          this.set(column as FaceImageColumn, value || "");
          break;
      }
    });
    return formData;
  }
}

export default FaceImage;
