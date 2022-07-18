import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface IconSetProps {
	index: number;
	icon: React.ReactElement;
	content: string;
}

function IconSet({ index, icon, content }: IconSetProps) {
	return (
		<Stack sx={{alignItems: 'center', maxWidth: 270}} spacing={5}>
			<Typography sx={{color: '#ff3366'}} variant='h5'>{index}.</Typography>
			<Box>{icon}</Box>
			<Typography variant='body1'>{content}</Typography>
		</Stack>
	);
}

export default IconSet;
