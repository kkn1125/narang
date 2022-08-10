import { Masonry } from "@mui/lab";
import {
  Button,
  ImageListItem,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
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
        <Button variant='outlined'>정렬</Button>
        {cookies.token && (
          <Button variant='outlined' onClick={() => navigate("./form")}>
            일기 쓰기
          </Button>
        )}
      </Stack>
      <Masonry columns={4} spacing={2}>
        {filteredItemData.length === 0 && (
          <Typography variant='body1'>공유된 일기가 없습니다 🥲</Typography>
        )}
        {filteredItemData.map((item, idx: number) => {
          const rand = getRandImg();
          return (
            <ImageListItem
              key={item.id}
              component={Paper}
              elevation={5}
              sx={{ "&.MuiImageListItem-root": { border: "none" } }}>
              <img
                src={rand.src}
                alt={item.title}
                loading='lazy'
                width={rand.width}
                height={rand.height}
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
                <Link to={item.id}>
                  <Typography variant='h5'>{item.title}</Typography>
                </Link>
                <OverflowContent variant='body2' limit={200}>
                  {getContent(item.content)}
                </OverflowContent>
              </Cover>
              <FavoritButton diaryId={item.id} />
            </ImageListItem>
          );
        })}
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
