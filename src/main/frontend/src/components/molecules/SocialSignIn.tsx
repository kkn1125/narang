import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface SocialInfo {
  name: string;
  url?: string;
  exUrl?: string;
  color?:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined;
  icon?: React.ReactElement;
  handler?: () => void;
}

export interface SocialSignInProps {
  socials: SocialInfo[];
}

function SocialSignIn({ socials }: SocialSignInProps) {
  const navigate = useNavigate();

  return (
    <Stack gap={3} sx={{ mb: 3 }}>
      <Stack direction='row' gap={3} justifyContent='space-between'>
        {socials.map(({ name, url, exUrl, color = "info", icon, handler }) => (
          <Button
            key={name}
            size='large'
            variant='contained'
            color={color || "info"}
            {...(icon && { startIcon: icon })}
            onClick={() => {
              if (handler) {
                handler();
              } else {
                if (exUrl) {
                  location.href = exUrl;
                } else {
                  navigate(url);
                }
              }
            }}
            sx={{
              flex: 1,
              textTransform: "capitalize",
            }}>
            {name}
          </Button>
        ))}
      </Stack>
      <Typography
        align='center'
        sx={(props) => ({ color: props.palette.grey[600] })}>
        또는 이메일 로그인을 이용해주세요.
      </Typography>
    </Stack>
  );
}

export default SocialSignIn;
