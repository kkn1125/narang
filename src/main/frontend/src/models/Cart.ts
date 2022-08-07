import { IModel, ModelData, ModelValue } from "./IModel";
import { PModel } from "./PModel";

export type CartColumn =
  | "id"
  | "uid"
  | "pid"
  | "amount"
  | "isOrdered"
  | "regdate"
  | "updates"
  | "_class";

export enum CartColumnStrings {
  id,
  uid,
  pid,
  amount,
  isOrdered,
  regdate,
  updates,
  _class,
}

class Cart extends PModel implements IModel<Cart, CartColumn> {
  private uid: string;
  private pid: string;
  private amount: bigint;
  private isOrdered: boolean;

  // setter
  public set(column: CartColumn, value: ModelValue) {
    console.log("set:", column, value);
    switch (column) {
      case "uid":
      case "pid":
      case "amount":
      case "isOrdered":
      default:
        break;
    }
  }

  // input list로 객체 값 해당 필드에 자동 할당
  public setByInputs(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as CartColumn, value);
    });
  }

  // axios response로 객체 값 해당 필드에 자동 할당
  public getResponseData(responseData: Cart): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as CartColumn, value);
    });
  }
}

export default Cart;
