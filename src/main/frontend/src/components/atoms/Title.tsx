import { Box, Typography } from "@mui/material";
import React from "react";

interface TitleProps {
	title: string;
	titleColor: string;
}

function Title({ title, titleColor }: TitleProps) {
	return (
		<Box sx={{ textAlign: "center", my: 8}}>
			<Typography variant='h4' sx={{color: titleColor}}>{ title }</Typography>
			<Box
				component='span'
				sx={{
					borderTop: "4px solid #ff3366",
					display: "inline-block",
					width: "3rem",
				}}></Box>
		</Box>
	);
}

export default Title;
