import { Button, Container, Stack } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React from "react";
import SignControl from "../../components/organisms/SignControl";

const fields = [
  {
    name: "nickname",
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
];

function SignUp() {
  const handleError = (err: any): void => {
    console.log(err);
  };

  const handleReceiveData = (res: AxiosResponse<any, any>): void => {
    console.log(res.data);
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const formDataInputs = Object.values(e.target).filter(
      (el) => el instanceof Element && el.tagName === "INPUT"
    );

    const formData = new FormData();

    formDataInputs.forEach((input) => formData.append(input.name, input.value));

    axios
      .post("/api/signup", formData)
      .then(handleReceiveData)
      .catch(handleError);

    return;
  };
  return (
    <Stack sx={{ flex: 1 }}>
      <SignControl mode='signup' fields={fields} onSubmit={onSubmit} />
    </Stack>
  );
}

export default SignUp;
