import BarChartIcon from "@mui/icons-material/BarChart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecommendIcon from "@mui/icons-material/Recommend";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import MenuItem from "../../models/MenuItem";
import Brand, { Responsive } from "../atoms/Brand";

const sideMenu: any = {
  top: [
    new MenuItem("일기", "/diary", <MenuBookIcon />),
    new MenuItem("감정 그래프", "/diary/graph", <BarChartIcon />),
    new MenuItem("오늘의 추천", "/diary/recommend", <RecommendIcon />),
    new MenuItem("장바구니", "/diary/cart", <ShoppingCartIcon />),
  ],
  // bottom: [
  //   // new MenuItem("사용법", "/diary/usage", <QuestionMarkIcon />)
  // ],
};

function DrawerBlock() {
  const navigate = useNavigate();
  const [user, dispatch] = useContext(UserContext);

  return (
    <div>
      <Toolbar>
        <Typography variant='h5' sx={{ fontWeight: 600 }}>
          <Brand responsive={Responsive.Desktop} />
          <Brand responsive={Responsive.Mobile} />
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "#ffffff30" }} />
      <List>
        {sideMenu.top
          .filter((menu: any, index: number) =>
            user.nickName ? true : index !== 1 && index !== 2 && index !== 3,
          )
          .map(({ text, url, icon }: MenuItem, index: number) => (
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
        {sideMenu.bottom?.map(
          ({ text, url, icon }: MenuItem, index: number) => (
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
          ),
        )}
      </List>
    </div>
  );
}

export default DrawerBlock;
