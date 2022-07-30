import { ModelStringValue, ModelValue } from "./IModel";

// parent model의 줄인 이름, 공통의 변수 및 함수 상속하기 위함
export class PModel {
  private _id: ModelStringValue = null;
  private regdate: number = 0;
  private updates: number = 0;
  private _class: string;

  // 공통 함수를 extends 상속으로 변경
  public log(): void {
    console.log(
      `[${this.constructor.name}_Class]:`,
      JSON.stringify(this, null, 2)
    );
  }

  // form 엘레멘트에서 클래스의 멤버 변수와 일치하는 input 엘레멘트 필터
  static getInputData(target: EventTarget): HTMLInputElement[] {
    return Object.values(target).filter(
      (el: HTMLInputElement) =>
        el instanceof Element &&
        el.tagName === "INPUT" &&
        this.hasOwnProperty(el.name)
    );
  }

  // Map 객체에 담아서 반환
  public getMap(): Map<string, ModelValue> {
    return new Map(Object.entries(this));
  }
}
