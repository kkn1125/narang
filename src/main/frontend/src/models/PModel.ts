import { ModelData, ModelStringValue, ModelValue } from "./IModel";

// parent model의 줄인 이름, 공통의 변수 및 함수 상속하기 위함
export class PModel {
  private id: ModelStringValue = null;
  private regdate: Date | number | string = null;
  private updates: Date | number | string = null;
  private _class: string = null;

  // 공통 함수를 extends 상속으로 변경
  public log(): void {
    console.log(
      `[${this.constructor.name}_Class]:`,
      JSON.stringify(this, null, 2),
    );
  }

  // form 엘레멘트에서 클래스의 멤버 변수와 일치하는 input 엘레멘트 필터
  static getInputData(target: EventTarget): HTMLInputElement[] {
    return Object.values(target).filter(
      (el: HTMLInputElement) =>
        el instanceof Element &&
        el.tagName === "INPUT" &&
        this.hasOwnProperty(el.name),
    );
  }

  // getter
  public get(column: string) {
    return Object.fromEntries(Object.entries(this))[column];
  }

  // Map 객체에 담아서 반환
  public getMap(): Map<string, ModelValue> {
    return new Map(Object.entries(this));
  }

  // 현재 객체 필드에 할당된 값으로 formData 생성
  public makeFormData(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([column, value]: [string, string]) => {
      console.log(column, value);
      switch (column) {
        case "negative":
        case "positive":
        case "normal":
          Object.entries(value).forEach(([key, val]) => {
            formData.append(`${column}.${key}`, val === undefined ? "" : val);
          });
          break;
        case "id":
        case "regdate":
        case "updates":
          break;
        default:
          if (value !== null) {
            formData.append(column, value === undefined ? "" : value);
          }
          break;
      }
    });
    return formData;
  }

  // 현재 객체 필드에 할당된 값으로 formData 생성
  public makeFormDataWithUpdate(): FormData {
    const formData = new FormData();
    Object.entries(this).forEach(([column, value]: [string, string]) => {
      console.log(column, value);
      switch (column) {
        case "negative":
        case "positive":
        case "normal":
          Object.entries(value).forEach(([key, val]) => {
            formData.append(`${column}.${key}`, val);
          });
          break;
        default:
          formData.append(column, value);
          break;
      }
    });
    return formData;
  }
}
