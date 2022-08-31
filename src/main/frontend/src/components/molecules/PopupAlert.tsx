import { Alert, Paper, Stack } from "@mui/material";
import React, { useEffect } from "react";

interface PopupAlertProps {
  type: "face" | "diary";
  setOffAlert: () => void;
}

const matchMsg = {
  face: "안면 인식 로그인이 되었습니다.",
  diary: "일기가 등록 되었습니다.",
};

function PopupAlert({ type, setOffAlert }: PopupAlertProps) {
  useEffect(() => {
    setTimeout(() => {
      setOffAlert();
    }, 3000);
  });

  return (
    <Stack
      alignItems='center'
      sx={{
        width: "100vw",
        height: "100vh",
        pt: 5,
        position: "fixed",
        zIndex: 1200,
        [`.MuiPaper-root`]: {
          backgroundColor: (theme) => theme.palette.success.main,
          color: "#ffffff",
          [`.MuiAlert-icon`]: {
            color: "inherit",
          },
        },
      }}>
      <Paper component={Alert} elevation={10} severity='success'>
        {matchMsg[type]}
      </Paper>
    </Stack>
  );
}

export default PopupAlert;
