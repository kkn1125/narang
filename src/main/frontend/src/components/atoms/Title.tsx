import { Box, Typography } from "@mui/material";
import React from "react";

export type SizeProps = "xs" | "s" | "m" | "l";

type Size =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline"
  | "inherit";

interface TitleProps {
  title: string | React.ReactElement;
  size: SizeProps;
  align: string;
  noGutter: boolean;
  main?: boolean;
}

const sizeType: {
  [index: string]: Size;
} = {
  xs: "body1",
  s: "h5",
  m: "h4",
  l: "h3",
};

function Title({ title, size, align, noGutter, main }: TitleProps) {
  return (
    <Box sx={{ textAlign: align, mb: !noGutter && 12 }}>
      <Typography
        variant={sizeType[size]}
        sx={{
          ...(main && {
            fontWeight: 500,
            textShadow: "3px 3px 5px #00000095",
          }),
        }}>
        {title}
        <Box
          component='span'
          sx={{
            display: "block",
            width: (theme) =>
              typeof title === "string"
                ? theme.typography.pxToRem(title.length * 4)
                : theme.typography.pxToRem(10 * 4),
            height: 4,
            backgroundColor: "#ff3366",
            margin: align === "center" ? "8px auto 0px" : "none",
          }}
        />
      </Typography>
    </Box>
  );
}

Title.defaultProps = {
  align: "center",
  size: "m",
  noGutter: false,
};

export default Title;
