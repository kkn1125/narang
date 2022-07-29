import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material";
import Item from "../../models/MenuItem";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = [new Item("Profile", "/auth/profile")];

function AvatarBox() {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
		null
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title='Open settings'>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}>
				{pages.map(({ text, url }) => (
					<MenuItem
						key={text}
						onClick={() => {
							handleCloseUserMenu();
							navigate(url);
						}}>
						<Typography textAlign='center'>{text}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
}

export default AvatarBox;
