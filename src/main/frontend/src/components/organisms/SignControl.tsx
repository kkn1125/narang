import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { capitalize } from "../../tools/utils";
import AuthTitle from "../molecules/AuthTitle";
import SocialSignIn, { SocialInfo } from "../molecules/SocialSignIn";
import TermsConditions from "../molecules/TermsConditions";
import TextFieldSet, { TextFieldItem } from "../molecules/TextFieldSet";

const SIGNIN = "signin";
const SIGNUP = "signup";

const AUTH = {
  signin: {
    title: "sign in",
    button: "로그인",
    subtitle: "소셜 계정으로 로그인 하려면 아래 버튼을 클릭하세요.",
    notice: "Don't have an account?",
  },
  signup: {
    title: "sign up",
    button: "회원가입",
    subtitle: "이메일을 사용하여 새 계정을 만드세요.",
    notice: "Have an account?",
  },
};

type Mode = "signin" | "signup";

interface SignControl {
  modelsLoaded?: boolean;
  processing?: number;
  faceSignStart?: boolean;
  setFaceSignStart?: React.Dispatch<React.SetStateAction<boolean>>;
  mode: Mode;
  onSubmit?: (e: React.FormEvent) => void;
  socials?: SocialInfo[];
  fields: TextFieldItem[];
  formik?: any;
}

function SignControl({
  modelsLoaded,
  processing,
  faceSignStart,
  setFaceSignStart,
  mode,
  onSubmit,
  socials,
  fields,
  formik,
}: SignControl) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { title, subtitle, button, notice } = AUTH[mode];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!modelsLoaded && setFaceSignStart) {
      setFaceSignStart(false);
    }
  }, [modelsLoaded]);

  return (
    <Stack justifyContent='center'>
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          메인으로
        </Button>
      </Box>
      <AuthTitle title={title} subtitle={subtitle} />
      <Stack component='form' onSubmit={formik.handleSubmit}>
        {mode === SIGNIN && (
          <Button
            variant='contained'
            size='large'
            onClick={() => setFaceSignStart(true)}>
            {!faceSignStart && "Face Sign In"}
            {faceSignStart &&
              (!modelsLoaded ? (
                <>
                  <CircularProgress size='small' color='warning' /> Preparing
                  ...
                </>
              ) : (
                (processing / 5) * 100 + "%"
              ))}
          </Button>
        )}

        {mode === SIGNIN && (
          <>
            <Divider sx={{ my: 2 }} />
            <SocialSignIn socials={socials} />
          </>
        )}
        <TextFieldSet fields={fields} size='medium' formik={formik} />
        {mode == SIGNUP && <TermsConditions formik={formik} />}
        <Button
          size='large'
          variant='contained'
          type='submit'
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}>
          {button}
          {isLoading && <CircularProgress size='small' color='info' />}
        </Button>
      </Stack>
      <Typography
        sx={{
          color: theme.palette.grey[500],
        }}>
        {notice}{" "}
        <Link
          to={`/auth/${mode === SIGNIN ? SIGNUP : SIGNIN}`}
          style={{
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}>
          {capitalize(mode === SIGNIN ? "sign up" : "sign in")}
        </Link>
      </Typography>
    </Stack>
  );
}

export default SignControl;
