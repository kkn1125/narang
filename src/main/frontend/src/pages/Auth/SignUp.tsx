import { Box, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { signup } from "../../apis/auth";
import SignControl from "../../components/organisms/SignControl";
import User from "../../models/User";
import * as yup from "yup";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";
import {
  emailValidation,
  nickNameValidation,
  passwordValidation,
  phoneValidation,
} from "../../tools/utils";
import { useNavigate } from "react-router-dom";

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

const validationSchema = yup.object({
  nickName: nickNameValidation,
  email: emailValidation,
  password: passwordValidation,
  check_password: passwordValidation.test(
    "passwords-match",
    "비밀번호가 일치하지 않습니다.",
    function (value) {
      return this.parent.password === value;
    },
  ),
  phone: phoneValidation,
  terms: yup.boolean(),
});

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nickName: "",
      email: "",
      password: "",
      check_password: "",
      phone: "",
      isFaceSign: false,
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = new User();
      user.getResponseData(values as unknown as User);
      const formData = user.makeFormData();
      signup(formData);
      navigate("/auth/signin");
    },
  });
  
  return (
    <Stack sx={{ height: "100%" }}>
      <Box sx={{ flex: 1 }} />
      <SignControl mode='signup' fields={fields} formik={formik} />
      <Box sx={{ flex: 1 }} />
    </Stack>
  );
}

export default SignUp;
