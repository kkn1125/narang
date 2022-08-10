import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import UserProvider from "./contexts/UserProvider";
import CommentProvider from "./contexts/CommentProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";

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
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </UserProvider>
    </CommentProvider>
  </ThemeProvider>,
);
