import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/templates/AuthLayout";
import DiaryLayout from "./components/templates/DiaryLayout";
import Layout from "./components/templates/Layout";
import About from "./pages/About";
import Profile from "./pages/Auth/Profile";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Diary from "./pages/Diary";
import Cart from "./pages/Diary/Cart";
import Detail from "./pages/Diary/Detail";
import Graph from "./pages/Diary/Graph";
import Recommend from "./pages/Diary/Recommend";
import Usage from "./pages/Diary/Usage";
import WriteForm from "./pages/Diary/WriteForm";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    const typerCss = document.createElement("link");
    typerCss.href = "https://cdn.jsdelivr.net/gh/kkn1125/typer@vv100/typer.css";
    typerCss.rel = "stylesheet";
    document.head.append(typerCss);
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Route>
      <Route path='/auth' element={<DiaryLayout />}>
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='/diary' element={<DiaryLayout />}>
        <Route index element={<Diary />} />
        <Route path=':id' element={<Detail />} />
        <Route path='form' element={<WriteForm />} />
        <Route path='form/:id' element={<WriteForm />} />
        <Route path='graph' element={<Graph />} />
        <Route path='recommend' element={<Recommend />} />
        <Route path='cart' element={<Cart />} />
        <Route path='usage' element={<Usage />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
