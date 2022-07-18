import React from "react";

class MenuItem {
  private base: string = "/diary/";
  constructor(
    public text: string,
    public url: string,
    public icon?: React.ReactElement
  ) {
    this.url = this.base + url;
  }
}

export default MenuItem;
