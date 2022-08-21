import { Container, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findCommentByDid } from "../../apis/comment";
import { CommentContext, loadComment } from "../../contexts/CommentProvider";
import { reverse } from "../../tools/utils";
import CommentItem from "../molecules/CommentItem";
import CommentInsert from "./CommentInsert";

function CommentList() {
  const params = useParams();
  const [comments, commentDispatch] = useContext(CommentContext);

  useEffect(() => {
    findCommentByDid(params.id).then((result: any[]) => {
      commentDispatch(loadComment(result));
    });
  }, [params.id]);

  return (
    <Container maxWidth='lg'>
      <CommentInsert
      // content={content}
      // setContent={setContent}
      // handleInsertComment={handleInsertComment}
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
