import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { addLike, deleteLikeByDid, findLikeByDid } from "../../apis/like";
import { UserContext } from "../../contexts/UserProvider";
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
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, dispatch] = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getInitialLikes = async () => {
      const likes = await findLikeByDid(diaryId);
      setCount(likes.length);
      likes.forEach((like: any) => {
        if (cookies.token && like.uid === user.id) {
          setIsClicked(true);
        } else {
          setIsClicked(false);
        }
      });
    };
    getInitialLikes();
  }, []);

  const handleFavoritCount = (e: React.MouseEvent) => {
    if (!isClicked) {
      setCount(count + 1);
      const like = new Like();
      like.set("did", diaryId);
      like.set("isLike", true);
      like.set("uid", user.id);
      addLike(like.makeFormData());
      setIsClicked(true);
      // TODO: setIsClicked는 로그인 JWT 구현 후 설정해야 함
    } else {
      setCount(count - 1);
      const formData = new FormData();
      formData.append("uid", user.id);
      deleteLikeByDid(diaryId, formData);
      setIsClicked(false);
    }
  };

  const noSignAlert = () => {
    alert("로그인 후 사용할 수 있는 기능 입니다.");
  };

  return (
    <Stack direction='row' alignItems='center' gap={0.3}>
      <IconButton
        size='small'
        onClick={
          cookies.token
            ? onClick
              ? (e) => onClick(e, setIsClicked, isClicked)
              : handleFavoritCount
            : () => noSignAlert()
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
