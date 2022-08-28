import BorderColorIcon from "@mui/icons-material/BorderColor";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Stack, Typography } from "@mui/material";
import { random } from "kadvice";
import React, { useEffect, useState } from "react";
import TyperTypography from "../components/atoms/TyperTypography";
import DynamicSection from "../components/organisms/DynamicSection";

const firstSection = [
  {
    icon: <BorderColorIcon sx={{ fontSize: 60 }} />,
    title: "일기 감정 분석",
    content: "작성한 일기의 텍스트를 분석해서 감정 정보를 읽어 냅니다.",
    // 일기에 나타난 나의 감정은 그래프로 전환되어, 나를 관리하는데 도움을 줍니다.
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 60 }} />,
    title: "안면 인식 로그인",
    content: "안면 인식을 통한 간편한 로그인 서비스를 지원합니다.",
    // 인증 절차가 편리한 요즘 더욱 편리한 사용감을 위해
  },
  {
    icon: <ShareIcon sx={{ fontSize: 60 }} />,
    title: "나의 일상 공유",
    content: "사용자가 나의 이야기를 공유할 수 있습니다.",
    // 일기는 개인이 공개 여부를 설정하여
  },
];

const secondsSection = [
  {
    index: 1,
    icon: (
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          fontSize: 25,
          fontWeight: 700,
          borderRadius: 3,
          color: "#353535",
          backgroundColor: "#ffbb57",
          // border: "1px solid #252525",
          minWidth: 75,
          minHeight: 75,
        }}
        children='TXT'
      />
    ),
    content:
      "네이버 파파고 API로 일기 내용을 번역하고, 번역된 내용을 sentiment 라이브러리로 감정 분석합니다. 일기 하단에는 일기 전체의 감정을 나타내는 이모지를 표시합니다.",
  },
  {
    index: 2,
    icon: (
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          fontSize: 25,
          fontWeight: 700,
          borderRadius: 3,
          color: "#ffffff",
          backgroundColor: "#6dbbff",
          // border: "1px solid #252525",
          minWidth: 75,
          minHeight: 75,
        }}
        children='AI'
      />
    ),
    content:
      "등록된 안면 이미지를 조회하여 AI기술을 통해 사용자와 일치 여부를 판별하고, 간편하게 로그인합니다. 안면 인식 로그인은 프로필에서 자신의 사진을 업로드하면 자동 활성화 됩니다.",
  },
  {
    index: 3,
    icon: (
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          fontSize: 25,
          fontWeight: 700,
          borderRadius: 3,
          color: "#ffffff",
          backgroundColor: "#51dc61",
          // border: "1px solid #252525",
          minWidth: 75,
          minHeight: 75,
          whiteSpace: "wrap",
          px: 3,
        }}
        children='GRAPH'
      />
    ),
    content:
      "분석된 감정 데이터는 Chart.js를 이용해 그래프로 표시합니다. 그래프를 통해 나의 감정을 케어하는 서비스를 사용할 수 있습니다.",
  },
];

function Home() {
  const [view, setView] = useState(false);
  const [advice, setAdvice] = useState<any>({});

  useEffect(() => {
    const refreshAdvice = () => {
      return random(2);
    };
    function tryAdvice() {
      try {
        setAdvice(refreshAdvice());
      } catch (e) {
        setAdvice(refreshAdvice());
      }
    }
    tryAdvice();
    setView(true);
  }, []);
  return (
    <Box>
      <DynamicSection
        main
        title={
          view && (
            <TyperTypography
              textList={[
                {
                  name: "base1",
                  value: [
                    "당신의 이야기를 들려주세요 😊",
                    "당신의 이야기를 공유하세요 😮",
                    "당신의 이야기에 집중하세요 😆",
                  ],
                },
              ]}
            />
          )
        }
        titleSize='m'
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
              <Typography variant='body1' component='div' align='center'>
                {advice.message !== "" ? (
                  <Box>
                    <Typography component='div'>{advice.message}</Typography>
                    <Typography component='div'>- {advice.author}</Typography>
                  </Box>
                ) : (
                  "명언을 불러오는 중 ..."
                )}
              </Typography>
            </Box>
          </Stack>
        }
      />
      <DynamicSection background icons={firstSection} />
      <DynamicSection
        title='MAIN SERVICE'
        titleSize='m'
        icons={secondsSection}
      />
    </Box>
  );
}

export default Home;
