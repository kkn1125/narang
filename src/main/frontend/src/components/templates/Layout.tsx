import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";

function Layout() {
	return (
		<Box>
			<Header />
			<Box>
				<Outlet />
			</Box>
		</Box>
	);
}

export default Layout;
