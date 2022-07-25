import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTitle from "../molecules/AuthTitle";
import SocialSignIn, { SocialInfo } from "../molecules/SocialSignIn";
import TermsConditions from "../molecules/TermsConditions";
import TextFieldSet from "../molecules/TextFieldSet";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { capitalize } from "../../tools/utils";

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

interface Field {
  name: string;
  placeholder: string;
  required: boolean;
}

interface SignControl {
  mode: Mode;
  onSubmit: (e: React.FormEvent) => void;
  socials: SocialInfo[];
  fields: Field[];
}

function SignControl({ mode, onSubmit, socials, fields }: SignControl) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { title, subtitle, button, notice } = AUTH[mode];

  return (
    <div>
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          메인으로
        </Button>
      </Box>
      <AuthTitle title={title} subtitle={subtitle} />
      <Stack component='form' onSubmit={onSubmit}>
        {mode === SIGNIN && (
          <Button
            variant='contained'
            size='large'
            onClick={() => navigate("/auth/facesign")}>
            Face Sign In
          </Button>
        )}
        <Divider sx={{ my: 2 }} />
        {mode === SIGNIN && <SocialSignIn socials={socials} />}
        <TextFieldSet fields={fields} size='medium' />
        {mode == SIGNUP && <TermsConditions />}
        <Button
          size='large'
          variant='contained'
          type='submit'
          sx={{ mt: 3, mb: 2 }}>
          {button}
        </Button>
      </Stack>
      <Typography
        sx={{
          color: theme.palette.grey[500],
        }}>
        {notice}{" "}
        <Link
          to='/auth/signup'
          style={{
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}>
          {capitalize(title)}
        </Link>
      </Typography>
    </div>
  );
}

export default SignControl;
