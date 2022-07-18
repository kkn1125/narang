import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Layout from "./components/templates/Layout";
import { Route, Routes, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Diary from "./pages/Diary";
import DiaryLayout from "./components/templates/DiaryLayout";
import WriteForm from "./pages/Diary/WriteForm";
import Recommend from "./pages/Diary/Recommend";
import Graph from "./pages/Diary/Graph";
import Share from "./pages/Diary/Share";
import Usage from "./pages/Diary/Usage";

export default function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
      ],
    },
    {
      path: "/diary",
      element: <DiaryLayout />,
      children: [
        { path: "", element: <Diary /> },
        { path: "write", element: <WriteForm /> },
        { path: "graph", element: <Graph /> },
        { path: "recommend", element: <Recommend /> },
        { path: "share", element: <Share /> },
        { path: "usage", element: <Usage /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return elements;
}
