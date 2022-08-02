import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface CommentInsertProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleInsertComment?: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

function CommentInsert({
  content,
  setContent,
  handleInsertComment,
}: CommentInsertProps) {
  const [showTextField, setShowTextField] = useState(false);

  useEffect(() => {
    // ..
  }, []);

  const handleTextFieldToggle = (e: React.MouseEvent) => {
    setShowTextField(!showTextField);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Stack alignItems='flex-end' sx={{ gap: 1, mb: 2 }}>
      <Stack direction='row' sx={{ gap: 1 }}>
        {showTextField && (
          <Button
            variant='contained'
            color='success'
            onClick={handleInsertComment}>
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
      {showTextField && (
        <TextField
          value={content}
          fullWidth
          multiline
          minRows={8}
          autoFocus
          onChange={handleChange}
          onKeyDown={handleInsertComment}
        />
      )}
    </Stack>
  );
}

export default CommentInsert;
