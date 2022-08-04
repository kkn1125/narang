import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import WavesBG from "../components/common/WavesBG";
import FaceSign from "../components/organisms/FaceSign";

const diaryProcess = [
  {
    id: 1,
    primary: "일기 원문을 파파고 번역 api로 영문 변환",
  },
  {
    id: 2,
    primary:
      "영문으로 번역된 내용을 토대로 sentiment 라이브러리를 통해 감정 분석을 하고 데이터를 확보",
  },
  {
    id: 3,
    primary:
      "확보된 데이터를 기반으로 chart.js를 사용하여 연, 월, 주 별 감정 그래프 생성",
  },
  {
    id: 4,
    primary:
      "감정 데이터의 긍정과 부정 score 값을 조회해서 사용자에게 감정 점수에 따른 굿즈를 추천",
  },
];

const developers = [
  {
    id: 1,
    name: "kkn1125",
    avatar: "https://avatars.githubusercontent.com/u/71887242?v=4",
    email: "chaplet01@gmail.com",
    github: "https://github.com/kkn1125",
    blog: "https://kkn1125.github.io/",
  },
  {
    id: 2,
    name: "ohoraming",
    avatar: "https://avatars.githubusercontent.com/u/77590526?v=4",
    email: "ohora.ming@gmail.com",
    github: "https://github.com/ohoraming",
    blog: "https://ohoraming.github.io/",
  },
];

function About() {
  return (
    <Box>
      <Box sx={{ position: "relative", minHeight: 500 }}>
        <WavesBG />
        <Container maxWidth='full' sx={{ pt: 15 }}>
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
            gutterBottom
            sx={{
              fontWeight: 300,
              color: "#ffffff",
              maxWidth: "60%",
              wordBreak: "keep-all",
            }}>
            "Narang"서비스는 개개인의 일기를 작성하면서 감정을 분석하고 해석된
            감정 데이터를 그래프로 변환하여 연, 월, 주 단위로 자신을 관찰
            가능하게 하는 감정 케어 서비스입니다.
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 300,
              color: "#ffffff",
              maxWidth: "60%",
              wordBreak: "keep-all",
            }}>
            주요 서비스는 일기를 작성하고, 일기의 내용을 분석하여 감정 데이터를
            얻어 연, 월, 주 단위로 그래프를 자동으로 작성합니다. 해당 데이터를
            작성자가 활용하여 자신의 감정을 케어하는데 도움을 주기 위함이
            목적이며, 로그인의 편의를 돕기 위해 안면 인식 로그인 기능을 고안하여
            개발을 진행 했습니다.
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
          elevation={15}
          gap={5}
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{ p: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "30vw 1 1",
              minWidth: 300,
              maxWidth: 500,
              minHeight: 300,
              height: "30vw",
              maxHeight: 500,
              backgroundColor: "#151515",
              overflow: "hidden",
            }}>
            <FaceSign test />
          </Box>
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
            <Typography gutterBottom variant='body1' sx={{ fontWeight: 300 }}>
              로그인을 보다 편리하게 하는 방법을 강구하면서 지문으로 하는 간편
              로그인은 많지만 안면 인식을 통해 로그인하는 방법은 위험을 감수해야
              하는 방법일 수 있지만 의미있는 시도라고 생각합니다.
            </Typography>
          </Box>
        </Stack>
      </Container>

      <Container maxWidth='full' sx={{ my: 10 }}>
        <Typography
          gutterBottom
          variant='h3'
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
        <Typography gutterBottom sx={{ fontWeight: 300 }}>
          일기 감정 분석 프로세스는 완벽하게 감점을 분석하지 못하는 약점이
          있습니다. 더 보완하려면 AI 분야 개발이 필요하지만 필요한 기능을
          조사하여 취약하지만 아이디어를 실현해보는 데 초점을 두어 안면 인식과
          더불어 좋은 경험이라 생각하고 개발에 임 했습니다.
        </Typography>
      </Container>

      <Container maxWidth='full' sx={{ my: 10 }}>
        <Typography
          gutterBottom
          variant='h3'
          sx={{ fontWeight: 700, textTransform: "uppercase" }}>
          개발 및 기여자
        </Typography>
        <List>
          {developers.map(
            ({ id, name, avatar, email, github, blog }, idx, o) => (
              <Fragment key={id}>
                <ListItem sx={{ alignItems: "flex-start" }}>
                  <ListItemAvatar>
                    <Avatar alt={name} src={avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={name + " [ FE/BE ]"}
                    secondary={
                      <List>
                        <ListItem>
                          <a href={`mailto:${email}`} target='_blank'>
                            Email : {email}
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href={github} target='_blank'>
                            Github : {github}
                          </a>
                        </ListItem>
                        <ListItem>
                          <a href={blog} target='_blank'>
                            Blog : {blog}
                          </a>
                        </ListItem>
                      </List>
                    }
                  />
                </ListItem>
                {idx !== o.length - 1 && <Divider sx={{ my: 1 }} />}
              </Fragment>
            )
          )}
        </List>
      </Container>
    </Box>
  );
}

export default About;
