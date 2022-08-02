import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { insertComment } from "../../apis/comment";
import Comment from "../../models/Comment";
import CommentItem from "../molecules/CommentItem";
import CommentInsert from "./CommentInsert";

function CommentList({ comments }: { comments: any[] }) {
  const [content, setContent] = useState("");

  const handleInsertComment = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      (e.type === "keydown" &&
        e.ctrlKey &&
        (e as React.KeyboardEvent).key === "Enter") ||
      e.type === "click"
    ) {
      const comment = new Comment();
      comment.set("content", content);
      comment.set("mention", "");
      comment.set("author", "author");

      const formData = comment.makeFormData();

      console.log(comment);
      if (e.type === "keydown") {
        insertComment(formData);
      } else if (e.type === "click") {
        insertComment(formData);
      }
    }
  };

  return (
    <Container maxWidth='md'>
      <CommentInsert
        content={content}
        setContent={setContent}
        handleInsertComment={handleInsertComment}
      />

      {comments.length === 0 && (
        <CommentItem>등록된 댓글이 없습니다 🥲</CommentItem>
      )}
      {comments.map((comment, idx) => (
        <CommentItem key={idx} comment={comment} />
      ))}
    </Container>
  );
}

export default CommentList;
