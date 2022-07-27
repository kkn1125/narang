import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export interface IconSetProps {
  index?: number;
  icon: React.ReactElement;
  title?: string;
  content: string;
}

function IconSet({ index, icon, title, content }: IconSetProps) {
  return (
    <Stack sx={{ alignItems: "center", width: 300 }} spacing={5}>
      {index && (
        <Typography
          sx={{
            fontWeight: 700,
            color: (theme) => theme.palette.error.main + " !important",
          }}
          variant='h5'>
          {index}.
        </Typography>
      )}
      <Box>{icon}</Box>
      {title && (
        <Typography variant='body1' sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      <Typography variant='h6' sx={{ fontWeight: 300 }}>
        {content}
      </Typography>
    </Stack>
  );
}

export default IconSet;
