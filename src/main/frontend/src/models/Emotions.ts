import {
  IModel,
  ModelData,
  ModelNumberValue,
  ModelStringValue,
  ModelValue,
} from "./IModel";
import { PModel } from "./PModel";

interface Whether {
  score: number;
  count: number;
  words: string[];
}
interface Normal {
  count: number;
}

// emotion 필드명 타입
export type EmotionColumn =
  | "id"
  | "uid"
  | "did"
  | "advice"
  | "comparative"
  | "emoji"
  | "negative"
  | "positive"
  | "normal"
  | "score"
  | "regdate"
  | "updates"
  | "_class";

export type EmotionColumnChild =
  | "normal.count"
  | "negative.score"
  | "negative.count"
  | "negative.words"
  | "positive.words"
  | "positive.words"
  | "positive.words";

// 얼굴이미지 필드명 enums
export enum EmotionColumnStrings {
  id,
  uid,
  did,
  advice,
  comparative,
  emoji,
  negative,
  positive,
  normal,
  score,
  regdate,
  updates,
  _class,
}

class Emotions extends PModel {
  private uid: string;
  private did: string;
  private advice: string;
  private comparative: number;
  private emoji: string;
  private negative: Whether;
  private positive: Whether;
  private normal: Normal;
  private score: number;

  public set(column: EmotionColumn, value: ModelValue | Whether | Normal) {
    switch (column) {
      case "uid":
      case "did":
      case "advice":
      case "emoji":
        this[column] = value as ModelStringValue;
        break;
      case "comparative":
      case "score":
        this[column] = value as ModelNumberValue;
        break;
      case "negative":
      case "positive":
        this[column] = value as unknown as Whether;
        break;
      case "normal":
        this[column] = value as unknown as Normal;
        break;
      default:
        break;
    }
  }

  public setByInputs(inputs: HTMLInputElement[]) {
    inputs.forEach((input) => {
      const { name, value } = input;
      this.set(name as EmotionColumn, value);
    });
  }

  public getResponseData(responseData: Emotions): void {
    Object.entries(responseData).forEach(
      ([column, value]: [string, ModelValue | Whether | Normal]) => {
        this.set(column as EmotionColumn, value);
      }
    );
  }
}

export default Emotions;
