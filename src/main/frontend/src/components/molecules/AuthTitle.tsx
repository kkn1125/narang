import { Box, Theme, Typography } from "@mui/material";
import React from "react";

interface AuthTitleProps {
  title: string;
  subtitle?: string;
}

function AuthTitle({ title, subtitle }: AuthTitleProps) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant='h4'
        sx={{
          textTransform: "capitalize",
          fontWeight: 600,
        }}>
        {title}
      </Typography>
      <Typography
        variant='body2'
        sx={(props: Theme) => ({
          color: props.palette.grey[500],
        })}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default AuthTitle;
