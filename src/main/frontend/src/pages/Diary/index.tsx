import { Masonry } from "@mui/lab";
import {
  Button,
  ImageListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { findAllDiary } from "../../apis/diary";
import FavoritButton from "../../components/atoms/FavoritButton";
import OverflowContent from "../../components/atoms/OverflowContent";
import { dev } from "../../tools/devConsole";

// https://romeoh.tistory.com/entry/face-api-face-apijs-for-Browser

// https://arnavbansal-8232.medium.com/how-to-face-api-in-react-953cfc70d6d

// https://github.com/justadudewhohacks/face-api.js#face-api.js-for-the-browser

// https://merrily-code.tistory.com/8

const randomSize = ["/640/480", "/640/300", "/640/500", "/640/250"];

function Diary() {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState([]);

  const getRandImg = () => {
    return `https://picsum.photos/seed/${parseInt(
      (Math.random() * 1000).toString()
    )}${randomSize[parseInt((Math.random() * 3).toString())]}`;
  };

  const getContent = (strings: string) => {
    return new DOMParser().parseFromString(strings, "text/html").body
      .textContent;
  };

  useEffect(() => {
    const getDiaryData = async () => {
      const diaries = await findAllDiary();
      dev.log('테스트 로그')
      if (diaries) {
        setItemData(diaries);
      }
    };
    getDiaryData();
  }, []);

  return (
    <DiaryBlock>
      <Stack direction='row' sx={{ mb: 3, gap: 3 }}>
        <Button variant='outlined'>정렬</Button>
        <Button variant='outlined' onClick={() => navigate("./write")}>
          일기 쓰기
        </Button>
      </Stack>
      <Masonry columns={4} spacing={2}>
        {itemData.length === 0 && (
          <Typography variant='body1'>공유된 일기가 없습니다 🥲</Typography>
        )}
        {itemData
          .filter((item) => item.isShare)
          .map((item, idx: number) => (
            <ImageListItem key={item.title}>
              <img src={getRandImg()} alt={item.title} loading='lazy' />
              <Cover>
                <Link to={item.id}>
                  <Typography variant='h5'>{item.title}</Typography>
                </Link>
                <OverflowContent variant='body2' limit={200}>
                  {getContent(item.content)}
                </OverflowContent>
              </Cover>
              <FavoritButton diaryId={item.id} />
            </ImageListItem>
          ))}
      </Masonry>
    </DiaryBlock>
  );
}

const Cover = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  height: 100%;
  width: 100%;
  padding: 1rem;
  background-color: #15151585;
  color: #ffffff;
  user-select: none;
`;

const DiaryBlock = styled("div")`
  .MuiImageListItem-root {
    border: 1px solid #c9c9c9;
    overflow: hidden;
    &:hover img {
      transform: scale(1.1);
      transition: 150ms ease-in-out;
    }
    &:hover div {
      opacity: 1;
      transition: 150ms 150ms ease-in-out;
    }
    &:hover [class*="MuiStack-root"] {
      color: #ffffff;
      transition: 150ms ease-in-out;
    }
    & [class*="MuiStack-root"] {
      position: absolute;
      top: 7px;
      right: 10px;
    }
  }
`;

export default Diary;
