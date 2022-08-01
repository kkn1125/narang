import { Stack } from "@mui/material";
import { FormikConfig, FormikHelpers, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { signup } from "../../apis/auth";
import { userApi } from "../../apis/user";
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

export type ValidationSchema = OptionalObjectSchema<
  {},
  AnyObject,
  TypeOfShape<{}>
>;

const validationSchema: ValidationSchema = yup.object({
  nickName: nickNameValidation,
  email: emailValidation,
  password: passwordValidation,
  check_password: passwordValidation.test(
    "passwords-match",
    "비밀번호가 일치하지 않습니다.",
    function (value) {
      return this.parent.password === value;
    }
  ),
  phone: phoneValidation,
  terms: yup.boolean(),
});

export interface FormikInitialValue {
  nickName: string;
  email: string;
  password: string;
  check_password: string;
  phone: string;
  terms: boolean;
}

function SignUp() {
  const [user, setUser] = useState(new User());
  const formik = useFormik({
    initialValues: {
      nickName: "",
      email: "",
      password: "",
      check_password: "",
      phone: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const user = new User();
    const inputDatas = User.getInputData(e.target);
    user.setByInputs(inputDatas);
    const formData = user.makeFormData();
    signup(formData);
  };

  // handler 정리
  const handleResult = (result: void | User) => {
    if (!result) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("[error] 통신이 잘 못 되었습니다. 서버를 확인하세요.");
      else throw new Error("[error] 서버에 이상이 발생했습니다.");
    }
    user.getResponseData(result as User);
  };

  const handleError = (err: any) => {
    if (process.env.NODE_ENV !== "production") console.log(err.message);
    else alert(err.message);
  };

  useEffect(() => {
    userApi("FIND_BY_ID", { pathVariable: "62e4d415a0c264729ff122ad" })
      .then(handleResult)
      .catch(handleError);
  }, []);

  return (
    <Stack sx={{ flex: 1 }}>
      <SignControl
        mode='signup'
        fields={fields}
        formik={formik}
        // onSubmit={onSubmit}
      />
    </Stack>
  );
}

export default SignUp;
