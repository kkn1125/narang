import React, { useEffect } from "react";
import AuthTitle from "../../components/molecules/AuthTitle";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import TextFieldSet from "../../components/molecules/TextFieldSet";
import SocialSignIn, {
  SocialInfo,
} from "../../components/molecules/SocialSignIn";
import axios, { AxiosResponse } from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link, useNavigate } from "react-router-dom";
import TermsConditions from "../../components/molecules/TermsConditions";
import SignControl from "../../components/organisms/SignControl";

const fields = [
  {
    name: "email",
    placeholder: "",
    required: true,
  },
  {
    name: "password",
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

function SignIn() {
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

    axios({
      method: "POST",
      url: "/api/signin",
      data: formData,
    })
      .then(handleReceiveData)
      .catch(handleError);

    return;
  };

  return (
    <Stack sx={{ flex: 1 }}>
      <SignControl
        mode='signin'
        fields={fields}
        socials={socials}
        onSubmit={onSubmit}
      />
    </Stack>
  );
}

export default SignIn;
