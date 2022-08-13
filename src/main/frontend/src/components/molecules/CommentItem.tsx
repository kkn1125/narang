import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect, useState
} from "react";
import { useCookies } from "react-cookie";
import { findUserByNickNames } from "../../apis/user";
import {
  CommentContext,
  removeComment,
  updateComment
} from "../../contexts/CommentProvider";
import { UserContext } from "../../contexts/UserProvider";
import UserInfo from "../organisms/UserInfo";

function CommentItem({
  comment,
  children,
}: {
  comment?: any;
  children?: React.ReactElement | React.ReactElement[] | string;
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(
    comment && comment.content ? comment.content : "",
  );
  const [cookies, setCooki] = useCookies();
  const [user, dispatch] = useContext(UserContext);
  const [comments, commentDispatch] = useContext(CommentContext);

  useEffect(() => {
    if (comment) {
      const metions = comment.mention.split("_");
      const formData = new FormData();
      metions.forEach((m: string) => {
        formData.append("userNickNames", m);
      });
      findUserByNickNames(formData);
    }
  }, []);

  const metionChips = useCallback(
    (metions: string) => {
      const filtered = metions.split("_").filter((mention) => mention);
      return filtered.map((mention: string, id) => (
        <Chip key={id} label={"@" + mention} />
      ));
    },
    [comment],
  );

  const handleRemoveComment = (id: string) => {
    commentDispatch(removeComment(id));
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleUpdateComment = () => {
    const mentions = (content.match(/(@[ㄱ-힣A-z0-9]+)+?/g) || [])
      .filter(
        (mention: string) =>
          mention && !mention.match(new RegExp(user.nickName)),
      )
      .join("_")
      .replace("@", "");

    const newComment = { ...comment, content: content, mention: mentions };
    commentDispatch(updateComment(newComment));
  };

  const mentionHighlight = (content: string) => {
    const split = content
      .split(/(@[ㄱ-힣A-z0-9]+)+?/g)
      .filter((_) => _)
      .map((_) =>
        _.match(/@/g) ? (
          <Chip
            label={_}
            sx={{
              transition: "150ms ease-in-out",
              backgroundColor: "#ffffff00",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "#ffffff",
              },
              ...(cookies.token &&
                _.match(user.nickName) && {
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }),
            }}
          />
        ) : (
          _
        ),
      );

    return split.map((_: string | React.ReactElement, id: number) => (
      <Fragment key={id}>{_}</Fragment>
    ));
  };

  return (
    <Paper
      elevation={10}
      sx={{
        p: 5,
      }}>
      {children}
      {comment && (
        <Box>
          <Stack direction='row' justifyContent='space-between'>
            <UserInfo author={comment.author} regdate={comment.regdate} />
            <Box>
              {cookies.token && comment.author === user.nickName && (
                <Box>
                  {open && (
                    <IconButton
                      color='success'
                      onClick={() => {
                        handleUpdateComment();
                        setOpen(false);
                        setContent("");
                      }}>
                      <CheckIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color={open ? "warning" : "primary"}
                    onClick={() => {
                      setOpen(!open);
                      open && setContent(comment.content);
                    }}>
                    {open ? <CancelOutlinedIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => {
                      handleRemoveComment(comment.id);
                      setOpen(false);
                      setContent("");
                    }}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Stack>
          {open ? (
            <TextField
              multiline
              fullWidth
              value={content}
              onChange={handleChangeContent}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.ctrlKey && e.key === "Enter") {
                  handleUpdateComment();
                  setOpen(false);
                }
              }}
            />
          ) : (
            <Typography component='div' variant='body1'>
              {mentionHighlight(comment.content)}
            </Typography>
          )}
          <Stack direction='row' gap={1} sx={{ mt: 1 }}>
            {metionChips(comment.mention)}
          </Stack>
        </Box>
      )}
    </Paper>
  );
}

export default CommentItem;
