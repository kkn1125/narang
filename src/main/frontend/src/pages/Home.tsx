import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShareIcon from "@mui/icons-material/Share";
import DynamicSection from "../components/organisms/DynamicSection";
import { dark } from "@mui/material/styles/createPalette";
import axios from "axios";
import { handleReceiveData, handleReceiveError } from "../apis/commonTypes";
import { dev } from "../tools/devConsole";
import { Link } from "react-router-dom";

const firstSection = [
  {
    icon: <BorderColorIcon sx={{ fontSize: 60 }} />,
    title: "일기 감정 분석",
    content:
      "작성한 일기의 텍스트를 분석해서 감정 정보를 읽어 냅니다. 일기에 나타난 나의 감정은 그래프로 전환되어, 나를 관리하는데 도움을 줍니다.",
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 60 }} />,
    title: "안면 인식 로그인",
    content:
      "인증 절차가 편리한 요즘 더욱 편리한 사용감을 위해 안면 인식을 통한 간편한 로그인 서비스를 지원합니다.",
  },
  {
    icon: <ShareIcon sx={{ fontSize: 60 }} />,
    title: "나의 일상 공유",
    content:
      "일기는 개인이 공개 여부를 설정하여 사용자가 함께 오늘의 이야기를 함께 공유할 수 있습니다.",
  },
];

const secondsSection = [
  {
    index: 1,
    icon: <BorderColorIcon sx={{ fontSize: 60 }} />,
    content:
      "일기를 작성하면 내용이 sentiment 라이브러리를 통해 감정 분석 됩니다. 감정 분석된 내용은 데이터베이스에 저장 됩니다.",
  },
  {
    index: 2,
    icon: <PsychologyIcon sx={{ fontSize: 60 }} />,
    content:
      "저장된 감정 데이터는 감정 점수에 대응하여 추천할 만한 상품을 표시하는 기능과, 나만의 감정 그래프를 생성하는데 사용 됩니다.",
  },
  {
    index: 3,
    icon: <ShareIcon sx={{ fontSize: 60 }} />,
    content:
      "작성한 일기를 사용자들과 공유하고, 나의 이야기를 우리들의 이야기로 만들어 보세요.",
  },
];

function Home() {
  const [advice, setAdvice] = useState("");
  useEffect(() => {
    const refreshAdvice = async () => {
      return axios
        .get("https://api.adviceslip.com/advice")
        .then(handleReceiveData)
        .catch(handleReceiveError);
    };
    refreshAdvice().then((data) => setAdvice(data.slip.advice));
  }, []);
  return (
    <Box>
      <DynamicSection
        main
        title='UPGRADE YOUR DAY'
        titleSize='l'
        img='https://cdn.pixabay.com/photo/2020/05/24/11/14/sea-5213746_1280.jpg'
        slot={
          <Stack alignItems='center' gap={3}>
            <Box>
              <Typography
                variant='body1'
                align='center'
                sx={{ fontWeight: 700 }}>
                오늘의 명언
              </Typography>
              <Typography variant='body1'>
                {advice !== "" ? "- " + advice : "명언을 불러오는 중 ..."}
              </Typography>
            </Box>
            <Button
              component={Link}
              to='/auth/signup'
              size='large'
              variant='contained'
              color='error'>
              회원 가입
            </Button>
            <Typography variant='body2'>당신의 이야기를 들려주세요.</Typography>
          </Stack>
        }
      />
      <DynamicSection background icons={firstSection} />
      <DynamicSection
        title='HOW IT WORKS'
        titleSize='m'
        icons={secondsSection}
      />
      <DynamicSection
        background
        slot={
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                width: 550,
                height: 350,
                top: "40%",
                left: "calc(50% + 10vw)",
                zIndex: 0,
                transform: "translate(-50%,-50%)",
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2022/04/13/11/02/dots-7130062_1280.png')",
                backgroundPosition: "left center",
                backgroundColor: "transparent",
                filter: "opacity(0.5)",
              }}
            />
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                width: 550,
                height: 350,
                top: "45%",
                left: "calc(55% + 10vw)",
                zIndex: 1,
                transform: "translate(-50%,-50%)",
                background:
                  "url('https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750')",
              }}
            />
            <Stack
              component={Paper}
              elevation={15}
              gap={3}
              sx={{
                position: {
                  xs: "static",
                  md: "absolute",
                },
                width: {
                  xs: "100%",
                  md: 550,
                },
                height: 350,
                top: "60%",
                left: "calc(25% + 10vw)",
                zIndex: 2,
                backgroundColor: "#ffc071",
                transform: {
                  xs: "none",
                  md: "translate(-50%,-50%)",
                },
                px: 7,
                py: 5,
              }}>
              <Typography variant='h3' sx={{ fontWeight: 700 }}>
                CONTACT
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 300 }}>
                Taste the holidays of the everyday close to home.
              </Typography>
              <TextField
                variant='outlined'
                fullWidth
                sx={{ "& fieldset": { backgroundColor: "#ffffff" } }}
              />
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{
                  backgroundColor: "black",
                  color: "white",
                }}>
                Submit
              </Button>
            </Stack>
          </Box>
        }
      />
    </Box>
  );
}

export default Home;
