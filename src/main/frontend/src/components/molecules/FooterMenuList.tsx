import { Stack } from "@mui/material";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MenuItem from "../../tools/models";
import Title from "../atoms/Title";

interface MenuList {
  title: string;
  items: MenuItem[];
}

interface MenuListProps {
  menuList: MenuList[];
}

function FooterMenuList({ menuList }: MenuListProps) {
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
            {items.map(({ text, url }) => (
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
