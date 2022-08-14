import {
  IModel, ModelData,
  ModelStringValue,
  ModelValue
} from "./IModel";
import { PModel } from "./PModel";

type CommentColumn =
  | "id"
  | "did"
  | "content"
  | "author"
  | "mention"
  | "regdate"
  | "updates"
  | "_class";

enum CommentColumnStrings {
  id,
  did,
  content,
  author,
  mention,
  regdate,
  updates,
  _class,
}

class Comment extends PModel implements IModel<Comment, CommentColumn> {
  private did: string;
  private content: string;
  private author: string;
  private mention: string;

  // setter
  public set(column: CommentColumn, value: ModelValue) {
    // console.log("set:", column, value);
    switch (column) {
      case "did":
      case "content":
      case "author":
      case "mention":
        this[column] = (value as ModelStringValue) || "";
        break;
      default:
        break;
    }
  }

  // input list로 객체 값 해당 필드에 자동 할당
  public setByInputs(inputs: HTMLInputElement[]): void {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as CommentColumn, value);
    });
  }

  // axios response로 객체 값 해당 필드에 자동 할당
  public getResponseData(responseData: Comment): void {
    Object.entries(responseData).forEach(([column, value]: ModelData) => {
      this.set(column as CommentColumn, value);
    });
  }
}

export default Comment;
