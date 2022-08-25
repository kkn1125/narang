import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { checkToken, signout } from "../../apis/auth";
import { findByJwt } from "../../apis/user";
import { removeUser, setUser, UserContext } from "../../contexts/UserProvider";
import Item from "../../models/MenuItem";
import { profileImageOrCat } from "../../tools/utils";

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
        if (cookies.token.token_type && cookies.token.token_type === "bearer") {
          axios
            .post(`/v1/user/logout`, null, {
              headers: {
                Authorization: `Bearer ${cookies.token.access_token}`,
              },
            })
            .then((result) => {
              const data = result.data;
              if (typeof data.id === "number") {
                setIsSignin(false);
                dispatch(removeUser());
              }
            });
        } else {
          await signout(cookies.token).finally(() => {
            setIsSignin(false);
            dispatch(removeUser());
          });
        }
        removeCookie("token", {
          path: "/",
        });
        removeCookie("token");
        navigate("/");
        navigate(0);
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
    const { token } = cookies;
    if (token) {
      if (!token.token_type) {
        checkToken(cookies.token).then((res) => {
          if (res.result === false) {
            signout(token);
            navigate("/auth/signin");
            removeCookie("token");
            alert("토큰이 만료 되었습니다.");
          }
        });
        findByJwt(token).then((res) => {
          if (res) {
            delete res["password"];
            dispatch(setUser(res));
          }
        });
      } else {
        axios
          .post(`/v2/user/me`, null, {
            headers: {
              Authorization: `${token.access_token}`,
              "content-type": "application/x-www-form-urlencoded",
            },
            params: {
              secure_resource: location.protocol.toLowerCase() === "https",
              property_keys: `["kakao_account.profile","kakao_account.email","kakao_account.name"]`,
            },
          })
          .then((result) => {
            if (result && result.data) {
              const {
                id,
                connected_at,
                kakao_account: {
                  profile: { nickname, profile_image_url, thumbnail_image_url },
                },
              } = result.data;
              dispatch(
                setUser({
                  id,
                  nickName: nickname,
                  profileImg: thumbnail_image_url,
                  regdate: connected_at,
                }),
              );
            }
          })
          .catch((e) => {
            // console.log(e);
            removeCookie("token", {
              path: "/",
            });
            navigate(0);
          });
      }
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
          <Avatar
            children={user.nickName?.[0].toUpperCase()}
            {...(user.profileImg && {
              src: user.profileImg.match(/http/g)
                ? user.profileImg
                : profileImageOrCat(user),
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
