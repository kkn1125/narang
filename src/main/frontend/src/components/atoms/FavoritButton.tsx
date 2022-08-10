import React, { useEffect, useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { addLike, deleteLikeByDid, findLikeByDid } from "../../apis/like";
import Like from "../../models/Like";

interface FavoritButton {
  diaryId: string;
  onClick?: (
    e: React.MouseEvent,
    setIsClicked: React.Dispatch<boolean>,
    isClicked: boolean,
  ) => void;
}

function FavoritButton({ diaryId, onClick }: FavoritButton) {
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getInitialLikes = async () => {
      const likes = await findLikeByDid(diaryId);
      setCount(likes.length);
    };
    getInitialLikes();
  }, []);

  const handleFavoritCount = (e: React.MouseEvent) => {
    if (!isClicked) {
      setCount(count + 1);
      const like = new Like();
      like.set("did", diaryId);
      like.set("isLike", true);
      like.set("uid", "kimson");
      addLike(like.makeFormData());
      setIsClicked(true);
      // TODO: setIsClicked는 로그인 JWT 구현 후 설정해야 함
    } else {
      setCount(count - 1);
      const formData = new FormData();
      formData.append("uid", "kimson");
      deleteLikeByDid(diaryId, formData);
      setIsClicked(false);
    }
  };

  return (
    <Stack direction='row' alignItems='center' gap={0.3}>
      <IconButton
        size='small'
        onClick={
          onClick
            ? (e) => onClick(e, setIsClicked, isClicked)
            : handleFavoritCount
        }>
        <SvgIcon fontSize='small' color='error'>
          {isClicked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </SvgIcon>
      </IconButton>
      <Typography>{count}</Typography>
    </Stack>
  );
}

export default FavoritButton;
