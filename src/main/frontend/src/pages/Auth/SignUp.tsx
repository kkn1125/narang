import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { signup } from "../../apis/auth";
import { userApi } from "../../apis/user";
import SignControl from "../../components/organisms/SignControl";
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
];

function SignUp() {
  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const user = new User();
    const inputDatas = User.getInputData(e.target);
    user.setByInputs(inputDatas);
    const formData = user.makeFormData();
    signup(formData);
  };

  useEffect(() => {
    const user = new User();
    userApi("FIND_BY_ID", { pathVariable: "62e4d415a0c264729ff122ad" }).then(
      (result) => {
        console.log(user);
        user.getResponseData(result as User);
      }
    );
  }, []);

  return (
    <Stack sx={{ flex: 1 }}>
      <SignControl mode='signup' fields={fields} onSubmit={onSubmit} />
    </Stack>
  );
}

export default SignUp;
