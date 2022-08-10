import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { SocialInfo } from "../../components/molecules/SocialSignIn";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import SignControl from "../../components/organisms/SignControl";
import { useFormik } from "formik";
import { emailValidation, passwordValidation } from "../../tools/utils";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";
import * as yup from "yup";
import { signin } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import FaceSign from "../../components/organisms/FaceSign";

const fields = [
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
];

const socials: SocialInfo[] = [
  {
    name: "google",
    url: "/",
    color: "error",
    icon: <GoogleIcon />,
  },
  {
    name: "facebook",
    url: "/",
    color: "info",
    icon: <FacebookIcon />,
  },
];

export type ValidationSchema = OptionalObjectSchema<
  {},
  AnyObject,
  TypeOfShape<{}>
>;
const validationSchema: ValidationSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
});
export interface FormikInitialValue {
  email: string;
  password: string;
}

function SignIn() {
  const [cookies, setCookie] = useCookies();
  const [faceSignStart, setFaceSignStart] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [processing, setProcessing] = useState(0);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const token = await signin(values);
      if (token) {
        setCookie("token", token, {
          path: "/",
        });
        navigate("/");
      } else {
        alert("이메일과 비밀번호를 확인해주세요.");
      }
    },
  });

  useEffect(() => {
    // console.log(cookies);
  }, []);

  const handleFaceSignStart = () => {
    setFaceSignStart(!faceSignStart);
  };

  return (
    <Stack sx={{ height: "100%" }}>
      <Box sx={{ flex: 1 }} />
      {faceSignStart && (
        <FaceSign
          modelsLoaded={modelsLoaded}
          setModelsLoaded={setModelsLoaded}
          processing={processing}
          setProcessing={setProcessing}
        />
      )}
      <SignControl
        modelsLoaded={modelsLoaded}
        processing={processing}
        faceSignStart={faceSignStart}
        setFaceSignStart={setFaceSignStart}
        mode='signin'
        formik={formik}
        fields={fields}
        socials={socials}
      />
      <Box sx={{ flex: 1 }} />
    </Stack>
  );
}

export default SignIn;
