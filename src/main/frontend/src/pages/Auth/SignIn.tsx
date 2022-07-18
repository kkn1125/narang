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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import TermsConditions from "../../components/molecules/TermsConditions";

const MODEL_URL = "/images";

const fields = [
  {
    name: "id",
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
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      // await faceapi.loadFaceLandmarkModel(MODEL_URL);
      // await faceapi.loadFaceRecognitionModel(MODEL_URL);
    })();
  }, []);

  const handleError = (err: any): void => {
    console.log(err);
  };

  const handleReceiveData = (res: AxiosResponse<any, any>): void => {
    console.log(res.data);
  };

  const handleSignIn = (e: React.FormEvent): void => {
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
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          메인으로
        </Button>
      </Box>
      <AuthTitle
        title='sign in'
        subtitle='소셜 계정으로 로그인 하려면 아래 버튼을 클릭하세요.'
      />
      <Stack component='form' onSubmit={handleSignIn}>
        <SocialSignIn socials={socials} />
        <TextFieldSet fields={fields} size='medium' />
        <TermsConditions />
        <Button
          size='large'
          variant='contained'
          type='submit'
          sx={{ mt: 3, mb: 2 }}>
          로그인
        </Button>
      </Stack>
      <Typography
        sx={{
          color: theme.palette.grey[500],
        }}>
        Don't have an account?{" "}
        <Link
          to='/auth/signup'
          style={{ color: theme.palette.primary.main, fontWeight: 600 }}>
          Sign Up
        </Link>
      </Typography>
    </Stack>
  );
}

export default SignIn;
