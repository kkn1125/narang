import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, useLocation } from "react-router-dom";
import PopupAlert from "./components/molecules/PopupAlert";
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

const BRAND = "Project Narang";

const uriMapping = (uri: string): string => {
  let temp = [BRAND];
  // console.log(uri);
  if (uri.match(/^\/about$/)) {
    temp.push("About");
  } else if (uri.match(/^\/auth\/signin/)) {
    temp.push("Sign-In");
  } else if (uri.match(/^\/auth\/signup/)) {
    temp.push("Sign-Up");
  } else if (uri.match(/^\/auth\/profile$/)) {
    temp.push("Porfile");
  } else if (uri.match(/^\/diary$/)) {
    temp.push("Diaries");
  } else if (uri.match(/^\/diary\/[\w\d]{24}/)) {
    temp.push("Details");
  } else if (uri.match(/^\/diary\/form$/)) {
    temp.push("Write");
  } else if (uri.match(/^\/diary\/form\/[\w\d]{24}/)) {
    temp.push("Update");
  } else if (uri.match(/^\/diary\/graph$/)) {
    temp.push("Graph");
  } else if (uri.match(/^\/diary\/recommend$/)) {
    temp.push("Recommend");
  } else if (uri.match(/^\/diary\/cart$/)) {
    temp.push("Cart");
  }
  // console.log(temp);
  return temp.join("::");
};

function App() {
  const locate = useLocation();
  const [pageName, setPageName] = useState(BRAND);

  useEffect(() => {
    const mappedName = uriMapping(locate.pathname.split("?").shift());
    setPageName(mappedName);
  }, [locate.pathname]);

  return (
    <>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/kkn1125/typer@vv100/typer.css'
        />
        <title>{pageName}</title>
        <meta name='title' property='og:title' content={pageName} />
        <meta name='url' property='og:url' content={location.href} />
        <meta name='url' property='url' content={location.href} />
      </Helmet>
      <PopupAlert />
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
    </>
  );
}

export default App;
