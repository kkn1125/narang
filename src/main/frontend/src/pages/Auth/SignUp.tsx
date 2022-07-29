import { Stack } from "@mui/material";
import React from "react";
import { authApi } from "../../apis/auth";
import SignControl from "../../components/organisms/SignControl";
import { ModelData } from "../../models/IModel";
import User from "../../models/User";

const fields = [
  {
    name: "nickName",
    type: "text",
    placeholder: "",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "",
    required: true,
  },
  {
    name: "check password",
    type: "password",
    placeholder: "",
    required: true,
  },
  {
    name: "phone",
    type: "text",
    placeholder: "",
    required: false,
  },
  {
    name: "isFaceSign",
    type: "checkbox",
    placeholder: "",
    hidden: true,
    value: false,
    required: false,
  },
  {
    name: "profileImg",
    type: "text",
    placeholder: "",
    hidden: true,
    value: "",
    required: false,
  },
];

function SignUp() {
  const user = new User();
  user.set("_id", "3");
  user.set("nickName", "dobby");
  user.set("email", "chaplet03@gmail.com");
  user.set("password", "123123qQ!");
  user.set("profileImg", "3");
  user.set("phone", "010-5050-2020");
  user.set("isFaceSign", false);
  user.get("nickName");
  user.getMap();

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const user = new User();
    const inputDatas = User.getInputData(e.target);
    user.setByInputs(inputDatas);
    const formData = user.makeFormData();
    authApi("SIGNUP", formData);
  };
  return (
    <Stack sx={{ flex: 1 }}>
      <SignControl mode='signup' fields={fields} onSubmit={onSubmit} />
    </Stack>
  );
}

export default SignUp;
