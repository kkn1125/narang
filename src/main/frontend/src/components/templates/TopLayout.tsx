import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function TopLayout() {
  const locate = useLocation();

  useEffect(() => {
    AOS.init();
  }, [locate.pathname]);

  return <Outlet />;
}

export default TopLayout;
