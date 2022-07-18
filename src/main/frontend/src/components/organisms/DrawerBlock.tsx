import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import RecommendIcon from "@mui/icons-material/Recommend";
import ShareIcon from "@mui/icons-material/Share";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";

import React, { useCallback } from "react";
import MenuItem from "../../tools/models";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const sideMenu = {
  top: [
    new MenuItem("일기", "", <MenuBookIcon />),
    new MenuItem("감정 그래프", "graph", <BarChartIcon />),
    new MenuItem("오늘의 추천", "recommend", <RecommendIcon />),
    new MenuItem("공유 일기", "share", <ShareIcon />),
  ],
  bottom: [new MenuItem("사용법", "usage", <QuestionMarkIcon />)],
};

function DrawerBlock() {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar>
        <Typography variant='h5' sx={{ fontWeight: 600 }}>
          <Link to='/'>Narang</Link>
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "#ffffff30" }} />
      <List>
        {sideMenu.top.map(({ text, url, icon }: MenuItem, index: number) => (
          <ListItem key={text} disablePadding onClick={() => navigate(url)}>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "#ffffff30",
                },
              }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <SvgIcon fontSize='small'>{icon}</SvgIcon>
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  variant: "body2",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "#ffffff30" }} />
      <List>
        {sideMenu.bottom.map(({ text, url, icon }: MenuItem, index: number) => (
          <ListItem key={text} disablePadding onClick={() => navigate(url)}>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "#ffffff30",
                },
              }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <SvgIcon fontSize='small'>{icon}</SvgIcon>
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  variant: "body2",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DrawerBlock;
