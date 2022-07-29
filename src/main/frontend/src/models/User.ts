import {
  IModel,
  ModelBooleanValue,
  ModelData,
  ModelStringValue,
  ModelValue,
  UserColumn,
} from "./IModel";

class User implements IModel<User, UserColumn> {
  protected _id: ModelStringValue = null;
  protected nickName: ModelStringValue = "";
  protected email: ModelStringValue = "";
  protected password: ModelStringValue = "";
  protected profileImg: ModelStringValue = "";
  protected phone: ModelStringValue = "";
  protected isFaceSign: ModelBooleanValue = false;
  protected terms: ModelBooleanValue = false;
  protected _class: string;

  public set(column: UserColumn, value: ModelValue) {
    if (
      (column === "isFaceSign" || column === "terms") &&
      typeof value === "boolean"
    ) {
      this[column] = value;
    } else if (
      column !== "isFaceSign" &&
      column !== "terms" &&
      typeof value !== "boolean"
    ) {
      this[column] = value;
    }
  }

  public get(column: UserColumn): ModelValue {
    console.log(`[${column}]:`, this[column]);
    return this[column];
  }

  public log(): void {
    console.log("[User_Class]:", JSON.stringify(this, null, 2));
  }

  public getMap(): Map<string, ModelValue> {
    console.log(new Map(Object.entries(this)));
    return new Map(Object.entries(this));
  }

  public setByInputs(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const column: UserColumn = input.name as UserColumn;
      const value = input.value;
      const chekced = input.checked;
      if ((column === "isFaceSign" || column === "terms") && chekced) {
        this[column] = chekced;
      } else if (!(column === "isFaceSign" || column === "terms") && value) {
        this[column] = value;
      }
    });
  }

  static getInputData(target: EventTarget): HTMLInputElement[] {
    return Object.values(target).filter(
      (el) => el instanceof Element && el.tagName === "INPUT"
    );
  }

  public makeFormData(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([key, value]: ModelData) => {
      if (typeof value === "boolean") {
        return formData.append(key, value.toString());
      } else {
        return formData.append(key, value);
      }
    });
    return formData;
  }
}

export default User;
