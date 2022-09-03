import BookIcon from "@mui/icons-material/Book";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

type Users = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  github: string;
  blog: string;
  nation: string;
  desc: string;
};

interface TeamCardProps {
  users: Users;
}

function TeamCard({ users }: TeamCardProps) {
  const { id, name, avatar, email, github, blog, nation, desc } = users;

  return (
    <Paper
      data-aos='fade-down'
      data-aos-delay={100 * id}
      key={name}
      elevation={5}
      sx={{
        flex: "25% 0 0",
        p: 3.5,
        minHeight: "250px",
        height: "60vh",
        maxHeight: "300px",
      }}>
      <Stack>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'>
          <Box>
            <Badge
              overlap='circular'
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <SmallAvatar
                  alt={nation}
                  src={`https://flagcdn.com/${nation}.svg`}
                />
              }>
              <Avatar
                variant='rounded'
                alt={name}
                src={avatar}
                sx={{
                  width: 70,
                  height: 70,
                }}
              />
            </Badge>
          </Box>
          <Stack direction='row'>
            <Tooltip title={"email".toUpperCase()}>
              <a href={`mailto:${email}`}>
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip title={"blog".toUpperCase()}>
              <a href={`${blog}`} target='_blank'>
                <IconButton>
                  <BookIcon />
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip title={"github".toUpperCase()}>
              <a href={`${github}`} target='_blank'>
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </a>
            </Tooltip>
          </Stack>
        </Stack>
        <Typography variant='body1' sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: (theme) => theme.palette.grey[500] }}>
          FE & BE
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant='body2'
          sx={{ color: (theme) => theme.palette.grey[500] }}>
          {desc}
        </Typography>
      </Stack>
    </Paper>
  );
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
  transform: `translateX(50%)`,
}));

export default TeamCard;
