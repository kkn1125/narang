import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Container
      maxWidth='sm'
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}>
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
