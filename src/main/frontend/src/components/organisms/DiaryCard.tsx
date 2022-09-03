import { CardMedia, Paper, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import { getRandImg } from "../../tools/utils";
import FavoritButton from "../atoms/FavoritButton";
import OverflowContent from "../atoms/OverflowContent";

const randImg = (idx: number) => `https://source.unsplash.com/random?${idx}`;
function DiaryCard({ item, idx }: { item: any; idx: number }) {
  const [user, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const rand = getRandImg();
  const imgRef = useRef(null);

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
        ref={imgRef}
        src={randImg(idx)}
        alt={item.title}
        loading='lazy'
        height={(rand.height as unknown as number) / 2}
        // onError={(e: any) => {
        //   // 이미지 seed가 없는 seed일 때 이미지 랜덤으로 다시 할당
        //   e.target.src = "https://random.responsiveimages.io/v1/docs";
        //   e.onerror = null;
        // }}
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

export default DiaryCard;
