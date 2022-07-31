import * as React from "react";
import Layout from "./components/templates/Layout";
import { useRoutes } from "react-router-dom";
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
import AuthLayout from "./components/templates/AuthLayout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import FaceLogin from "./pages/Auth/FaceLogin";
import Profile from "./pages/Auth/Profile";

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
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "facesign", element: <FaceLogin /> },
      ],
    },
    {
      path: "/auth",
      element: <DiaryLayout />,
      children: [{ path: "profile", element: <Profile /> }],
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
