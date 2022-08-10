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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { checkToken, signout } from "../../apis/auth";
import { findByJwt } from "../../apis/user";
import { removeUser, setUser, UserContext } from "../../contexts/UserProvider";
import { profileIamgeOrCat } from "../../tools/utils";

function AvatarBox() {
  const navigate = useNavigate();
  const [user, dispatch] = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isSignin, setIsSignin] = useState(false);

  const [items, setItems] = useState([
    new Item("Profile", "/auth/profile", null, isSignin),
    new Item("Diary", "/diary", null, !isSignin),
    new Item("Sign in", "/auth/signin", null, !isSignin),
    new Item("Sign up", "/auth/signup", null, !isSignin),
    new Item("Logout", "/auth/signout", null, isSignin).activateHandler(
      async () => {
        setItems(items.map((item) => item.changeActive()));
        await signout(cookies.token).finally(() => {
          setIsSignin(false);
          dispatch(removeUser());
        });
        removeCookie("token", {
          path: "/",
        });
        navigate("/");
      },
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
    const { token } = cookies;
    if (token) {
      // console.log(decodeJwt(token))
      // if (decodeJwt(token).exp * 1000 <= Date.now()) {
      //   removeCookie("token");
      // }
      checkToken(cookies.token).then((res) => {
        if (res.result === false) {
          signout(token);
          navigate("/auth/signin");
          removeCookie("token");
          alert("토큰이 만료 되었습니다.");
        }
      });
      setIsSignin(true);
      setItems(items.map((item) => item.changeActive()));
      findByJwt(token).then((res) => {
        if (res) {
          // console.log(res);
          delete res["password"];
          dispatch(setUser(res));
        }
      });
    } else {
      setIsSignin(false);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            children={user.nickName?.[0].toUpperCase()}
            {...(user.profileImg && {
              src: profileIamgeOrCat(user),
            })}
          />
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
