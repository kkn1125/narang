import React, { useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";

interface FavoritButton {
  onClick?: (
    e: React.MouseEvent,
    setIsClicked: React.Dispatch<boolean>,
    isClicked: boolean
  ) => void;
}

function FavoritButton({ onClick }: FavoritButton) {
  const [isClicked, setIsClicked] = useState(false);
  const count = useRef(0);

  const handleFavoritCount = (e: React.MouseEvent) => {
    setIsClicked(!isClicked);
    count.current = count.current + (!isClicked ? +1 : -1);
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
      <Typography>{count.current}</Typography>
    </Stack>
  );
}

export default FavoritButton;
