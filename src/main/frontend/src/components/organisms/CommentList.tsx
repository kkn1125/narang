import { Container, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCommentByDid, insertComment } from "../../apis/comment";
import {
  CommentContext,
  loadComment,
  setComment,
} from "../../contexts/CommentProvider";
import { UserContext } from "../../contexts/UserProvider";
import Comment from "../../models/Comment";
import { reverse } from "../../tools/utils";
import CommentItem from "../molecules/CommentItem";
import CommentInsert from "./CommentInsert";

function CommentList() {
  const params = useParams();
  const [comments, commentDispatch] = useContext(CommentContext);
  const [user, dispatch] = useContext(UserContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    findCommentByDid(params.id).then((result: any[]) => {
      commentDispatch(loadComment(result));
    });
  }, [params.id]);

  const addComment = (newComment: any) => {
    const comment = new Comment();
    comment.getResponseData(newComment);
    const formData = comment.makeFormData();
    insertComment(formData).then(() => {
      findCommentByDid(params.id).then((result: any[]) => {
        commentDispatch(loadComment(result));
      });
    });
  };

  const handleInsertComment = (e: React.MouseEvent | React.KeyboardEvent) => {
    const newComment = new Comment();
    newComment.set("did", params.id);
    newComment.set("author", user.nickName);
    newComment.set("content", content);
    newComment.set(
      "mention",
      (content.match(/(@[ㄱ-힣A-z0-9]+)+?/g) || [])
        .filter(
          (mention) => mention && !mention.match(new RegExp(user.nickName)),
        )
        .join("_")
        .replace("@", ""),
    );

    if (e.type === "keydown") {
      addComment(newComment);
    } else if (e.type === "click") {
      addComment(newComment);
    }
    setContent("");
  };

  return (
    <Container maxWidth='lg'>
      <CommentInsert
        content={content}
        setContent={setContent}
        handleInsertComment={handleInsertComment}
      />

      <Stack
        gap={3}
        sx={{
          mb: 10,
        }}>
        {comments.length === 0 && (
          <CommentItem>등록된 댓글이 없습니다 🥲</CommentItem>
        )}
        {reverse(comments).map((comment: any, idx: React.Key) => (
          <CommentItem key={idx} comment={comment} />
        ))}
      </Stack>
    </Container>
  );
}

export default CommentList;
