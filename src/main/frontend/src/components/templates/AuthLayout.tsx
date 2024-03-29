import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Container maxWidth='sm' sx={{ height: "100%" }}>
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
