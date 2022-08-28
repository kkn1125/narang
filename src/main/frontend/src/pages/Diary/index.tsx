import { Masonry } from "@mui/lab";
import {
  Button,
  CardActionArea,
  CardMedia,
  Paper,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { findDiaryAll } from "../../apis/diary";
import FavoritButton from "../../components/atoms/FavoritButton";
import OverflowContent from "../../components/atoms/OverflowContent";
import { UserContext } from "../../contexts/UserProvider";

// https://romeoh.tistory.com/entry/face-api-face-apijs-for-Browser

// https://arnavbansal-8232.medium.com/how-to-face-api-in-react-953cfc70d6d

// https://github.com/justadudewhohacks/face-api.js#face-api.js-for-the-browser

// https://merrily-code.tistory.com/8

const randomSize = ["640/480", "640/300", "640/500", "640/250"];

function Diary() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, dispatch] = useContext(UserContext);
  const [itemData, setItemData] = useState([]);

  const getRandImg = () => {
    const size =
      randomSize[parseInt((Math.random() * 3).toString())].split("/");
    const [width, height] = size;
    return {
      width,
      height,
      src: `https://picsum.photos/seed/${parseInt(
        (Math.random() * 1000).toString(),
      )}/${size.join("/")}`,
    };
  };

  const getContent = (strings: string) => {
    return new DOMParser().parseFromString(strings, "text/html").body
      .textContent;
  };

  useEffect(() => {
    const getDiaryData = async () => {
      const diaries = await findDiaryAll();
      if (diaries) {
        setItemData(diaries);
      }
    };
    getDiaryData();
  }, []);

  const filteredItemData = useMemo(
    () =>
      itemData.filter((item) =>
        user.nickName ? item.isShare || user.id === item.uid : item.isShare,
      ),
    [itemData],
  );

  return (
    <DiaryBlock>
      <Stack direction='row' sx={{ mb: 3, gap: 3 }}>
        {/* <Button variant='outlined'>정렬</Button> */}
        {cookies.token && (
          <Button variant='outlined' onClick={() => navigate("./form")}>
            일기 쓰기
          </Button>
        )}
      </Stack>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {filteredItemData.length === 0 && (
          <Typography variant='body1'>공유된 일기가 없습니다 🥲</Typography>
        )}
        {filteredItemData
          .sort(
            (a, b) =>
              new Date(b.regdate).getTime() - new Date(a.regdate).getTime(),
          )
          .map((item, idx: number) => {
            const rand = getRandImg();
            return (
              <CardActionArea
                key={item.id}
                component={Paper}
                elevation={5}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  navigate(item.id);
                }}>
                <CardMedia
                  component='img'
                  src={rand.src}
                  alt={item.title}
                  loading='lazy'
                  width={rand.width}
                  height={(rand.height as unknown as number) / 2}
                  onError={(e: any) => {
                    // 이미지 seed가 없는 seed일 때 이미지 랜덤으로 다시 할당
                    e.target.src = getRandImg().src;
                  }}
                />
                {!item.isShare && (
                  <Typography
                    sx={{
                      color: "#ffffff",
                      transform: "translate(15px, -30px)",
                    }}>
                    {user.nickName}님의 비공개 된 일기 입니다.
                  </Typography>
                )}
                <Cover>
                  <OverflowContent
                    limit={20}
                    variant='h5'
                    sx={{
                      fontSize: (theme) => ({
                        xs: theme.typography.pxToRem(16),
                        sm: theme.typography.pxToRem(18),
                        md: theme.typography.pxToRem(24),
                      }),
                    }}>
                    {item.title}
                  </OverflowContent>
                </Cover>
                <FavoritButton diaryId={item.id} />
              </CardActionArea>
            );
          })}
      </Masonry>
    </DiaryBlock>
  );
}

const Cover = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: useMediaQuery(theme.breakpoints.up("md")) ? 0 : 1,
  height: "100%",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#15151585",
  color: "#ffffff",
  userSelect: "none",
}));

const DiaryBlock = styled("div")(({ theme }) => ({
  ".MuiPaper-root": {
    overflow: "hidden",
    "&:hover img": {
      transform: "scale(1.1)",
      transition: "150ms ease-in-out",
    },
    "&:hover div": {
      opacity: 1,
      transition: "150ms ease-in-out",
    },
    "&:hover div:last-of-type": {
      color: "#ffffff",
      transition: "150ms ease-in-out",
    },
    "& div:last-of-type": {
      position: "absolute",
      top: "7px",
      right: "10px",
    },
  },
}));

export default memo(Diary);
