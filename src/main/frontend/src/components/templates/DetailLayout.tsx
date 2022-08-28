import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import React, { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteDiaryById } from "../../apis/diary";
import { deleteEmotionByDid } from "../../apis/emotions";
import { findUserById } from "../../apis/user";
import { UserContext } from "../../contexts/UserProvider";
import CommentList from "../organisms/CommentList";
import UserInfo from "../organisms/UserInfo";

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (
      domNode instanceof Element &&
      domNode.attribs &&
      domNode.attribs.class === "remove"
    ) {
      return <></>;
    }
  },
};

function DetailLayout({ diary, emotion }: { diary: any; emotion: any }) {
  const { id, uid, title, content, author, regdate, updates } = diary;
  const navigate = useNavigate();
  const [user, dispatch] = useContext(UserContext);
  const [diaryOwner, setDiaryOwner] = useState(null);

  useEffect(() => {
    findUserById(uid).then((result) => {
      setDiaryOwner(result);
    });
  }, []);

  const handleDeleteDiary = async (e: React.MouseEvent) => {
    if (!confirm("일기를 삭제하시겠습니까?")) return;
    await deleteDiaryById(id);
    await deleteEmotionByDid(id);
    navigate("/diary");
  };

  const handleUpdateDiary = () => {
    navigate(`/diary/form/${id}`);
  };

  return (
    <Container maxWidth='lg'>
      <UserInfo author={author} regdate={regdate} diaryOwner={diaryOwner} />

      {/* title */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-end'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
          sx={{ flex: 1 }}>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {user && user.id === uid && (
            <Stack direction='row' gap={1}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleUpdateDiary}>
                일기 수정
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleDeleteDiary}>
                일기 지우기
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* contents */}
      <Typography
        component='div'
        variant='body1'
        sx={{
          fontWeigth: 300,
          minHeight: (theme) => theme.typography.pxToRem(300),
        }}>
        {parse(content, options)}
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ my: 2 }}>
        <Stack direction='row' sx={{ gap: 1 }}>
          <Button
            color='secondary'
            variant='contained'
            onClick={() => {
              navigate("/diary");
            }}>
            목록으로 돌아가기
          </Button>
          {diaryOwner && diaryOwner.id === user.id && (
            <Button
              color='info'
              variant='contained'
              onClick={() => navigate("/diary/graph")}>
              그래프로 보기
            </Button>
          )}
        </Stack>
        <Typography component='div'>
          일기 감정{" "}
          <Typography
            component='span'
            sx={{ fontSize: (theme) => theme.typography.pxToRem(24) }}>
            {emotion.emoji}
          </Typography>
        </Typography>
      </Stack>

      <CommentList />
    </Container>
  );
}

export default memo(DetailLayout);
