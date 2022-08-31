import { Alert, Paper, Snackbar, SnackbarOrigin, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSearchQueryToMap } from "../../tools/utils";

const matchMsg: {
  face: string;
  diary: string;
} = {
  face: "안면 인식 로그인이 되었습니다.",
  diary: "일기가 등록 되었습니다.",
};

function PopupAlert() {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [type, setType] = useState<"face" | "diary" | null>(null);
  const params: any = getSearchQueryToMap();

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (params.has("face")) {
      // alert
      setType("face");
    } else if (params.has("diary")) {
      setType("diary");
    }

    setState({
      open: true,
      vertical: "top",
      horizontal: "center",
    });
  }, []);
  if(!type) return null;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal } as SnackbarOrigin}
      open={open}
      onClose={handleClose}
      message={matchMsg[type]}
      key={matchMsg[type]}
      autoHideDuration={30000}
      sx={{
        [`.MuiPaper-root.MuiSnackbarContent-root`]: {
          backgroundColor: (theme) => theme.palette.success.main,
        },
      }}
    />
  );
}

export default PopupAlert;
