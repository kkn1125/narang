import { GlobalStyles } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CommentProvider from "./contexts/CommentProvider";
import UserProvider from "./contexts/UserProvider";
import theme from "./theme";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles
      styles={{
        "html, body, #root": {
          height: "100%",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      }}
    />
    <CommentProvider>
      <UserProvider>
        <CookiesProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </UserProvider>
    </CommentProvider>
  </ThemeProvider>,
);
