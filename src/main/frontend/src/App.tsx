import * as React from "react";
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
import Usage from "./pages/Diary/Usage";
import AuthLayout from "./components/templates/AuthLayout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
// import FaceLogin from "./pages/Auth/[x]FaceLogin";
import Profile from "./pages/Auth/Profile";
import Detail from "./pages/Diary/Detail";
import Cart from "./pages/Diary/Cart";
import { withCookies } from "react-cookie";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        {/* <Route path='facesign' element={<FaceLogin />} /> */}
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
    </Routes>
  );
}

export default App;
