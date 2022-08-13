import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BRAND = "NARANG";

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
  return (
    <>
      <BedtimeOutlinedIcon
        sx={{ display: responsiveOption[responsive], mr: 1 }}
      />
      <Typography
        variant='h6'
        noWrap
        component={Link}
        to='/'
        sx={{
          ...(responsive === Responsive.Mobile && {
            flexGrow: 1,
          }),
          mr: 2,
          display: responsiveOption[responsive],
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        {BRAND}
      </Typography>
    </>
  );
}

export default Brand;
