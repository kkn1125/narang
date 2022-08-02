import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import UserInfo from "../organisms/UserInfo";

function CommentItem({
  comment,
  children,
}: {
  comment?: any;
  children?: React.ReactElement | React.ReactElement[] | string;
}) {
  return (
    <Paper
      elevation={10}
      sx={{
        p: 10,
      }}>
      {children && children}
      {comment && (
        <Box>
          <UserInfo author={comment.author} regdate={comment.regdate} />
          <Typography>{comment.content}</Typography>
        </Box>
      )}
    </Paper>
  );
}

export default CommentItem;
