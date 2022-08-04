import React from "react";

// 메뉴 아이템 클래스
class MenuItem {
  constructor(
    public text: string = null,
    public url: string = null,
    public icon?: React.ReactElement,
    public isActive?: boolean,
    public handler?: () => Promise<boolean>
  ) {}
  public changeActive() {
    if (this.url.match("sign")) {
      this.isActive = !this.isActive;
    }
    return this;
  }
  public activateHandler(addHandler: () => Promise<boolean>) {
    this.handler = async (): Promise<boolean> => {
      return await addHandler();
    };
    return this;
  }
}

export default MenuItem;
