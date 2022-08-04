import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Item from "../../models/MenuItem";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signout } from "../../apis/auth";

function AvatarBox() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isSignin, setIsSignin] = useState(false);

  const [items, setItems] = useState([
    new Item("Profile", "/auth/profile", null, !isSignin),
    new Item("Diary", "/diary", null, !isSignin),
    new Item("Sign in", "/auth/signin", null, !isSignin),
    new Item("Sign up", "/auth/signup", null, !isSignin),
    new Item("Logout", "/auth/signout", null, isSignin).activateHandler(
      async () => {
        removeCookie("sessionid");
        removeCookie("JSESSIONID");
        setItems(items.map((item) => item.changeActive()));
        return await signout();
      }
    ),
  ]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // console.log("이후 세션 받아와야 함");
    const { sessionid } = cookies;
    if (sessionid) {
      setIsSignin(true);
      setItems(items.map((item) => item.changeActive()));
    } else {
      setIsSignin(false);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {items
          .filter((_) => _.isActive)
          .map(({ text, url, handler }) => (
            <MenuItem
              key={text}
              onClick={() => {
                handleCloseUserMenu();
                if (handler) {
                  handler();
                } else {
                  navigate(url);
                }
              }}>
              <Typography textAlign='center'>{text}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
}

export default AvatarBox;
