import React from "react";

class MenuItem {
  constructor(
    public text: string,
    public url: string,
    public icon?: React.ReactElement
  ) {}
}

export default MenuItem;
