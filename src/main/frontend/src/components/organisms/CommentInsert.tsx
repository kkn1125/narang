import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

interface CommentInsertProps {
  content?: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
  handleInsertComment?: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

function CommentInsert({
  content,
  setContent,
  handleInsertComment,
}: // content,
CommentInsertProps) {
  const [cookies, setCookie] = useCookies(["token"]);
  const [showTextField, setShowTextField] = useState(false);

  const handleTextFieldToggle = (e: React.MouseEvent) => {
    setShowTextField(!showTextField);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Stack alignItems='flex-end' sx={{ gap: 1, mb: 2 }}>
      {cookies.token && (
        <Stack direction='row' sx={{ gap: 1 }}>
          {showTextField && (
            <Button
              variant='contained'
              color='success'
              onClick={(e: React.MouseEvent) => {
                handleInsertComment(e);
                setShowTextField(false);
              }}>
              댓글 등록
            </Button>
          )}
          <Button
            variant='contained'
            onClick={handleTextFieldToggle}
            color={showTextField ? "error" : "primary"}>
            댓글 {showTextField ? "취소" : "작성"}
          </Button>
        </Stack>
      )}
      {showTextField && (
        <TextField
          value={content}
          fullWidth
          multiline
          minRows={8}
          autoFocus
          onChange={handleChange}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (
              (e.type === "keydown" &&
                e.ctrlKey &&
                (e as React.KeyboardEvent).key === "Enter") ||
              e.type === "click"
            ) {
              handleInsertComment(e);
              setShowTextField(false);
            }
          }}
        />
      )}
    </Stack>
  );
}

export default CommentInsert;
