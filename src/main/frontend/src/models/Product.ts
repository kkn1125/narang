import { IModel, ModelData, ModelValue } from "./IModel";
import { PModel } from "./PModel";

export type ProductColumn =
  | "id"
  | "category"
  | "name"
  | "thumbnail"
  | "price"
  | "amount"
  | "content"
  | "seller"
  | "isSoldOut"
  | "regdate"
  | "updates"
  | "_class";

export enum ProductColumnStrings {
  id,
  category,
  name,
  thumbnail,
  price,
  amount,
  content,
  seller,
  isSoldOut,
  regdate,
  updates,
  _class,
}

class Product extends PModel implements IModel<Product, ProductColumn> {
  private category: string;
  private name: string;
  private thumbnail: string;
  private price: bigint;
  private amount: bigint;
  private content: string;
  private seller: string;
  private isSoldOut: boolean;

  // setter
  public set(column: ProductColumn, value: ModelValue) {
    console.log("set:", column, value);
    switch (column) {
      case "category":
      case "name":
      case "thumbnail":
      case "price":
      case "amount":
      case "content":
      case "seller":
      case "isSoldOut":
      default:
        break;
    }
  }
  
  // input list로 객체 값 해당 필드에 자동 할당
  public setByInputs:(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as ProductColumn, value);
    });
  }
  
  // axios response로 객체 값 해당 필드에 자동 할당
  public getResponseData(responseData: Product): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as ProductColumn, value);
    });
  }
}

export default Product;
