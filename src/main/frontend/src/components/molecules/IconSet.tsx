import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export interface IconSetProps {
  index?: number;
  icon: React.ReactElement;
  title?: string;
  content: string;
}

interface IconOrderSetProps extends IconSetProps {
  order: number;
}

function IconSet({ index, icon, title, content, order }: IconOrderSetProps) {
  return (
    <Stack
      sx={{ alignItems: "center", width: 300 }}
      spacing={5}
      data-aos='fade-down'
      data-aos-delay={100 * (order + 1)}>
      {index >= 0 && (
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
