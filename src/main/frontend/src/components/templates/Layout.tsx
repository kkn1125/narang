import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

function Layout() {
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
