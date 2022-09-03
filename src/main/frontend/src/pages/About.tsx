import {
  Alert,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import WavesBG from "../components/common/WavesBG";
import FaceSign from "../components/organisms/FaceSign";
import TeamCard from "../components/organisms/TeamCard";

const diaryProcess = [
  {
    id: 1,
    primary: "일기 원문을 파파고 번역 API로 영문 변환",
  },
  {
    id: 2,
    primary:
      "영문으로 번역된 내용을 토대로 Sentiment 라이브러리를 통해 감정 분석을 하고 데이터를 확보",
  },
  {
    id: 3,
    primary:
      "확보된 데이터를 기반으로 Chart.js를 사용하여 주 단위 감정 그래프 생성",
  },
  {
    id: 4,
    primary:
      "감정 데이터의 긍정과 부정 Score 값을 조회해서 사용자에게 감정 점수에 따른 굿즈를 추천",
  },
];

const developers = [
  {
    id: 1,
    name: "kkn1125 (팀원)",
    avatar: "https://avatars.githubusercontent.com/u/71887242?v=4",
    email: "chaplet01@gmail.com",
    github: "https://github.com/kkn1125",
    blog: "https://kkn1125.github.io/",
    nation: "kr",
    desc: "그림 그리기 🖼️ 와 기타 🎸 를 다루는 것이 취미 입니다 😁",
  },
  {
    id: 2,
    name: "ohoraming (팀원)",
    avatar: "https://avatars.githubusercontent.com/u/77590526?v=4",
    email: "ohora.ming@gmail.com",
    github: "https://github.com/ohoraming",
    blog: "https://ohoraming.github.io/",
    nation: "kr",
    desc: "캐러멜맛 🍿팝콘 먹으며 영화 보기🎬와 🚶‍♀산책을 좋아합니다 😎",
  },
];

function About() {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          minHeight: {
            xs: 500,
            md: 350,
          },
        }}>
        <WavesBG />
        <Container maxWidth='lg' sx={{ pt: 15 }}>
          <Typography
            variant='h2'
            gutterBottom
            sx={{
              fontWeight: 700,
              textTransform: "capitalize",
              color: "#ffffff",
            }}>
            project narang
          </Typography>
          <Typography
            variant='h6'
            gutterBottom
            sx={{
              fontWeight: 300,
              color: "#ffffff",
              maxWidth: {
                xs: "auto",
                md: "60%",
              },
              wordBreak: "keep-all",
            }}>
            "Narang"서비스는 일기를 작성하면서 감정을 분석하고 해석된 감정
            데이터를 그래프로 변환하여 주 단위로 자신을 관찰하는 감정 케어
            서비스입니다.
          </Typography>
        </Container>
      </Box>

      <Container
        component={Stack}
        sx={{
          position: "relative",
          width: "100%",
        }}>
        <Stack
          component={Paper}
          elevation={5}
          gap={5}
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{ p: 5 }}>
          <Stack direction='row' justifyContent='center'>
            <FaceSign test />
          </Stack>
          <Box
            sx={{
              flex: 1,
            }}>
            <Typography
              gutterBottom
              variant='h4'
              sx={{ fontWeight: 700, textTransform: "uppercase" }}>
              face detect & sentiment analysis
            </Typography>
            <Typography gutterBottom variant='body1' sx={{ fontWeight: 300 }}>
              face-api.js를 사용해서 안면 인식 및 감정 분석을 가능하게 합니다.
              안면 인식을 통해 간편하게 로그인을 할 수 있습니다.
            </Typography>
            <Alert severity='info' sx={{ my: 5 }}>
              미디어 로드 및 안면 인식 프레임이 표시되는데 기기마다 시간 지연 될
              수 있습니다. 안면 인식 기술 사용을 위해 모델 자료를 로드하기
              때문에 미디어와 프레임을 함께 렌더링하는데 약 1~2분의 시간이
              소요될 수 있습니다. 밝은 곳에서 화상 카메라를 사용하시기 바랍니다.
            </Alert>
          </Box>
        </Stack>
      </Container>

      <Container maxWidth='lg' sx={{ my: 10 }}>
        <Typography
          gutterBottom
          variant='h4'
          sx={{ fontWeight: 700, textTransform: "uppercase" }}>
          diary sentiment analysis
        </Typography>
        <Typography gutterBottom sx={{ fontWeight: 300 }}>
          일기 내용을 분석하는 프로세스는 다음과 같습니다.
        </Typography>
        <List>
          {diaryProcess.map(({ id, primary }, idx, o) => (
            <Fragment key={id}>
              <ListItem>
                <ListItemText primary={`${id}. ${primary}`} />
              </ListItem>
              {idx !== o.length - 1 && <Divider sx={{ my: 1 }} />}
            </Fragment>
          ))}
        </List>
      </Container>

      <Container maxWidth='lg' sx={{ my: 10 }}>
        <Typography
          gutterBottom
          variant='h4'
          sx={{ fontWeight: 700, textTransform: "uppercase" }}>
          Teams
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ gap: 3 }}>
          {developers.map((users, idx, o) => (
            <TeamCard key={idx} users={users} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default About;
