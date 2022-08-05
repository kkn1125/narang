import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MenuItem from "../../models/MenuItem";
import FooterMenuList from "../molecules/FooterMenuList";

const menuList = [
  {
    title: "Diary",
    items: [
      new MenuItem("일기", "/diary"),
      new MenuItem("감정 그래프", "/diary/graph"),
      new MenuItem("오늘의 추천", "/diary/recommend"),
      new MenuItem("장바구니", "/diary/cart"),
      new MenuItem("사용법", "/diary/usage"),
    ],
  },
];

function Footer({ bottomFixed = false }: { bottomFixed?: boolean }) {
  return (
    <Box
      component='footer'
      sx={{
        // ...(bottomFixed && {
        //   position: "fixed",
        //   bottom: 0,
        // }),
        display: "flex",
        alignItems: "center",
        minHeight: 300,
        p: 10,
        backgroundColor: "#f0e3e7",
      }}>
      <Stack gap={3}>
        <Stack direction='row' gap={5}>
          <FooterMenuList menuList={menuList} />
        </Stack>
        <Stack direction='row'>
          <Typography>
            <code>Project Narang</code>은 일기를 쓰고 감정을 읽어서 나의 감정을
            그래프로 나타내며, 주, 월, 연 별로 나를 돌아볼 수 있게 도움을 주는
            웹 서비스 입니다. 안면 인식 로그인을 통해 쉽게 로그인 하는 등의
            편의를 고려한 서비스를 준비 하였습니다.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
