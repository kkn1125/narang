import { Stack } from "@mui/material";
import React, { Fragment, useContext } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import MenuItem from "../../models/MenuItem";
import Title from "../atoms/Title";

interface MenuList {
  title: string;
  items: MenuItem[];
}

interface MenuListProps {
  menuList: MenuList[];
}

function FooterMenuList({ menuList }: MenuListProps) {
  const [user, dispatch] = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <Stack
      justifyContent='flex-start'
      sx={{
        "& .MuiTypography-root": {
          fontWeight: 700,
        },
      }}>
      {menuList &&
        menuList.map(({ title, items }) => (
          <Fragment key={title}>
            <Title title={title} size='xs' align='left' noGutter />
            {items
              .filter(({ isActive, text }) =>
                cookies.token && cookies.token.token_type
                  ? isActive && text !== "프로필"
                  : isActive,
              )
              .map(({ text, url }) => (
                <Link key={text} to={url}>
                  {text}
                </Link>
              ))}
          </Fragment>
        ))}
    </Stack>
  );
}

export default FooterMenuList;
