import { Masonry } from "@mui/lab";
import { Button, Skeleton, Stack, styled, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { findDiaryAll } from "../../apis/diary";
import DiaryCard from "../../components/organisms/DiaryCard";
import { UserContext } from "../../contexts/UserProvider";
import { dummies, getRandImg } from "../../tools/utils";

// https://romeoh.tistory.com/entry/face-api-face-apijs-for-Browser

// https://arnavbansal-8232.medium.com/how-to-face-api-in-react-953cfc70d6d

// https://github.com/justadudewhohacks/face-api.js#face-api.js-for-the-browser

// https://merrily-code.tistory.com/8

function Diary() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, dispatch] = useContext(UserContext);
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        {filteredItemData.map((item, idx: number) => (
          <DiaryCard key={idx} item={item} idx={idx} />
        ))}
      </Masonry>
    </DiaryBlock>
  );
}

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
