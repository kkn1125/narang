import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { Badge, Box, IconButton } from "@mui/material";

import React, { useState } from "react";
import AvatarBox from "./AvatarBox";

const menuId = "primary-search-account-menu";

function MessageBox() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 1,
      }}>
      <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
        <Badge badgeContent={4} color='error'>
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton
        size='large'
        aria-label='show 17 new notifications'
        color='inherit'>
        <Badge badgeContent={17} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <AvatarBox />
    </Box>
  );
}

export default MessageBox;
