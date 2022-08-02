import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
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

function DetailLayout({ diary }: { diary: any }) {
  const { title, content, author, regdate, updates } = diary;
  return (
    <Container maxWidth='lg'>
      <UserInfo author={author} regdate={regdate} />

      {/* title */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-end'>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>
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

      <CommentList comments={[]} />
    </Container>
  );
}

export default DetailLayout;
