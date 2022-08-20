import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { convertLongToDate, profileImageOrCat } from "../../tools/utils";

interface UserInfoProps {
  author: string;
  regdate: string;
  diaryOwner?: any;
  slot?: React.ReactElement | React.ReactElement[];
}

function UserInfo({ author, regdate, diaryOwner, slot }: UserInfoProps) {
  const toRegdate = new Date(regdate);
  const numberRegdate = toRegdate.getTime();
  const getFirstWord = (name: string) => {
    return name?.substring(0, 1).toUpperCase();
  };

  return (
    <Stack direction='row' alignItems='center' sx={{ gap: 2, mb: 3 }}>
      <Avatar
        children={getFirstWord(author)}
        sx={{ width: 48, height: 48 }}
        src={profileImageOrCat(diaryOwner)}
      />
      <Stack justifyContent='space-between'>
        <Typography>{author}</Typography>
        <Stack direction='row' alignItems='center'>
          <Typography
            variant='body2'
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}>
            {convertLongToDate(numberRegdate)}
          </Typography>
          {slot}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default UserInfo;
