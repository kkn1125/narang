import { Button, Stack, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { CommentContext, setComment } from "../../contexts/CommentProvider";
import { UserContext } from "../../contexts/UserProvider";
import Comment from "../../models/Comment";

interface CommentInsertProps {
  content?: string;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
  handleInsertComment?: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

function CommentInsert({}: // content,
// setContent,
// handleInsertComment,
CommentInsertProps) {
  const params = useParams();
  const [cookies, setCookie] = useCookies(["token"]);
  const [showTextField, setShowTextField] = useState(false);
  const [content, setContent] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const [comments, commentDispatch] = useContext(CommentContext);

  useEffect(() => {
    // ..
  }, []);

  const handleInsertComment = (e: React.MouseEvent | React.KeyboardEvent) => {
    const comment = new Comment();
    comment.set("did", params.id);
    comment.set("author", user.nickName);
    comment.set("content", content);
    comment.set(
      "mention",
      (content.match(/(@[ㄱ-힣A-z0-9]+)+?/g) || [])
        .filter(
          (mention) => mention && !mention.match(new RegExp(user.nickName)),
        )
        .join("_")
        .replace("@", ""),
    );

    if (e.type === "keydown") {
      commentDispatch(setComment(comment));
    } else if (e.type === "click") {
      commentDispatch(setComment(comment));
    }
    setContent("");
  };

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
