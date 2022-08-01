import React from "react";

// 메뉴 아이템 클래스
class MenuItem {
  constructor(
    public text: string = null,
    public url: string = null,
    public icon?: React.ReactElement,
    public isActive?: boolean
  ) {}
}

export default MenuItem;
