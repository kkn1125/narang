import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MenuItem from "../../tools/models";
import FooterMenuList from "../molecules/FooterMenuList";

const menuList = [
  {
    title: "LEGAL",
    items: [new MenuItem("name", "/")],
  },
];

function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 300,
        px: 10,
        backgroundColor: "#f0e3e7",
      }}>
      <Stack gap={3}>
        <Stack direction='row' gap={5}>
          <FooterMenuList menuList={menuList} />
        </Stack>
        <Stack direction='row'>
          <Typography>
            Icons made by Freepik from www.flaticon.com is licensed by CC 3.0 BY
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
