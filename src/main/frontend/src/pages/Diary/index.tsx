import { Masonry } from "@mui/lab";
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoritButton from "../../components/atoms/FavoritButton";
import OverflowContent from "../../components/atoms/OverflowContent";

// https://romeoh.tistory.com/entry/face-api-face-apijs-for-Browser

// https://arnavbansal-8232.medium.com/how-to-face-api-in-react-953cfc70d6d

// https://github.com/justadudewhohacks/face-api.js#face-api.js-for-the-browser

// https://merrily-code.tistory.com/8

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];

function Diary() {
  const navigate = useNavigate();

  return (
    <DiaryBlock>
      <Stack direction='row'>
        <Button variant='outlined'>정렬</Button>
        <Button variant='outlined' onClick={() => navigate("./write")}>
          일기 쓰기
        </Button>
      </Stack>
      <Masonry columns={4} spacing={2}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
            <Cover>
              <Typography variant='h5'>Title</Typography>
              <OverflowContent variant='body2' limit={200}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
                reiciendis. Laboriosam impedit voluptatem debitis iste earum
                architecto adipisci dolor accusantium magnam aut? Assumenda vel
                voluptas expedita repudiandae ipsa nesciunt molestias?
              </OverflowContent>
            </Cover>
            <FavoritButton />
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
