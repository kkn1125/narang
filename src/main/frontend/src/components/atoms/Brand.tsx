import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { LOGO_FULL, LOGO_SHORT, LOGO_STYLE } from "../../tools/utils";

export enum Responsive {
  Mobile = "mobile",
  Desktop = "desktop",
}

interface BrandProps {
  responsive: Responsive;
}

const responsiveOption = {
  [Responsive.Desktop]: { xs: "none", md: "flex" },
  [Responsive.Mobile]: { xs: "flex", md: "none" },
};

function Brand({ responsive }: BrandProps) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const BRAND = (
    <Box
      component='img'
      src={mdUp ? LOGO_FULL : LOGO_SHORT}
      loading='lazy'
      sx={LOGO_STYLE}
    />
  );

  return (
    <Box
      sx={{
        display: responsiveOption[responsive],
        alignItems: "center",
        ...(responsive === Responsive.Mobile && {
          flexGrow: 1,
        }),
      }}>
      <Typography
        variant='h6'
        noWrap
        component={Link}
        to='/'
        sx={{
          display: responsiveOption[responsive],
          alignItems: "center",
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        {BRAND}
      </Typography>
    </Box>
  );
}

export default Brand;
