import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "@mui/material";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles
      styles={{
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      }}
    />
    <BrowserRouter>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
