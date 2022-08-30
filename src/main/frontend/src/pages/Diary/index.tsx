import { Masonry } from "@mui/lab";
import {
  Button,
  CardMedia,
  Paper,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { findDiaryAll } from "../../apis/diary";
import FavoritButton from "../../components/atoms/FavoritButton";
import OverflowContent from "../../components/atoms/OverflowContent";
import { UserContext } from "../../contexts/UserProvider";
import { dummies } from "../../tools/utils";

// https://romeoh.tistory.com/entry/face-api-face-apijs-for-Browser

// https://arnavbansal-8232.medium.com/how-to-face-api-in-react-953cfc70d6d

// https://github.com/justadudewhohacks/face-api.js#face-api.js-for-the-browser

// https://merrily-code.tistory.com/8

const randomSize = ["640/400", "640/300", "640/500", "640/600"];

function Diary() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, dispatch] = useContext(UserContext);
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      }
    };
    getDiaryData();
  }, []);

  const filteredItemData = itemData.filter((item) =>
    user.nickName ? item.isShare || user.id === item.uid : item.isShare,
  );

  return (
    <DiaryBlock>
      <Stack direction='row' sx={{ mb: 3, gap: 3 }}>
        {cookies.token && (
          <Button variant='outlined' onClick={() => navigate("./form")}>
            일기 쓰기
          </Button>
        )}
      </Stack>
      <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={3}>
        {/* Diary 길이가 0일 때 */}
        {!isLoading && filteredItemData.length === 0 && (
          <Typography variant='body1'>공유된 일기가 없습니다 🥲</Typography>
        )}

        {/* Diary 더미 데이터 */}
        {isLoading &&
          dummies.map((dummy, idx) => {
            const rand = getRandImg();
            return (
              <Skeleton
                key={idx}
                animation='wave'
                variant='rectangular'
                width={rand.width}
                height={(rand.height as unknown as number) / 2}
              />
            );
          })}

        {/* Diary 아이템 로드 시 */}
        {filteredItemData.map((item, idx: number) => {
          const rand = getRandImg();
          return (
            <Paper
              key={item.id}
              elevation={10}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                navigate(item.id);
              }}>
              <CardMedia
                component='img'
                src={rand.src}
                alt={item.title}
                loading='lazy'
                height={(rand.height as unknown as number) / 2}
                onError={(e: any) => {
                  // 이미지 seed가 없는 seed일 때 이미지 랜덤으로 다시 할당
                  e.target.src = getRandImg().src;
                  e.onerror = null;
                }}
              />
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
              {!item.isShare && (
                <Typography
                  sx={{
                    color: "#ffffff",
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                  }}>
                  {user.nickName}님의 비공개 된 일기 입니다.
                </Typography>
              )}
              <FavoritButton diaryId={item.id} />
            </Paper>
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
  height: "100%",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#15151500",
  color: "#ffffffa5",
  userSelect: "none",
  textAlign: "center",
}));

const DiaryBlock = styled("div")(({ theme }) => ({
  ".MuiPaper-root": {
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    "&:hover img": {
      transform: "scale(1.1)",
      transition: "150ms ease-in-out",
    },
    "&:hover img+div": {
      transition: "150ms ease-in-out",
      color: "#ffffff",
      backgroundColor: "#151515a5",
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
