import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Item from "../../models/MenuItem";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AvatarBox from "../molecules/AvatarBox";
import Brand, { Responsive } from "../atoms/Brand";

const pages = [new Item("About", "/about")];

const Header = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLink = (to: string) => {
    navigate(to);
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: "#28282a" }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Brand responsive={Responsive.Desktop} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map(({ text, url }) => (
                <MenuItem
                  key={text}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleLink(url);
                  }}>
                  <Typography textAlign='center'>{text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Brand responsive={Responsive.Mobile} />
          {/* <BedtimeOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            {BRAND}
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ text, url }) => (
              <Button
                key={text}
                onClick={() => {
                  handleCloseNavMenu();
                  handleLink(url);
                }}
                sx={{ my: 2, color: "white", display: "block" }}>
                {text}
              </Button>
            ))}
          </Box>

          <AvatarBox />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
