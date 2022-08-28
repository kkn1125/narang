import GoogleIcon from "@mui/icons-material/Google";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";
import { signin } from "../../apis/auth";
import { SocialInfo } from "../../components/molecules/SocialSignIn";
import FaceSign from "../../components/organisms/FaceSign";
import SignControl from "../../components/organisms/SignControl";
import { ReactComponent as KakaoIcon } from "../../svg/Kakao.svg";
import {
  emailValidation,
  getSearchQueryToMap,
  passwordValidation,
} from "../../tools/utils";

const BASE_URI =
  process.env.NODE_ENV === "production"
    ? "https://narang.ml"
    : "http://localhost:3000";
const REST_API_KEY = `3555000cc39f213189c0ef743ffdfabc`;
const REDIRECT_URI = BASE_URI + `/auth/signin`;

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
  // {
  //   name: "google",
  //   url: "/",
  //   color: "error",
  //   icon: <GoogleIcon />,
  // },
  {
    name: "kakao",
    // url: "",
    exUrl: `/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`,
    color: "warning",
    icon: <KakaoIcon style={{ width: 24, height: 24, color: "#ffffff" }} />,
    // handler: () => {
    //   axios
    //     .get(
    //       `/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
    //         REDIRECT_URI,
    //       )}`,
    //     )
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
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
  const [cookies, setCookie] = useCookies(["token"]);
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
    const params = getSearchQueryToMap();
    if (params.get("code")) {
      const grant_type = "authorization_code";
      const client_id = REST_API_KEY;
      const redirect_uri = REDIRECT_URI;
      const code = params.get("code");
      axios
        .post(`/oauth/token`, null, {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          params: {
            grant_type,
            client_id,
            redirect_uri,
            code,
          },
        })
        .then((result) => {
          // console.log(result);
          const data = result.data;
          const {
            id_token,
            access_token,
            expires_in,
            refresh_token,
            refresh_token_expires_in,
            token_type,
            scope,
          } = data;
          setCookie(
            "token",
            {
              token_type,
              access_token,
            },
            {
              path: "/",
            },
          );
          navigate("/");
        })
        .catch((e) => {
          navigate("/auth/signin");
        });
    }
  }, []);

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
