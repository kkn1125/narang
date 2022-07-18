import { Box, Stack } from "@mui/material";
import React from "react";
import Image from "../components/atoms/Image";
import Title from "../components/atoms/Title";
import IconSet from "../components/molecules/IconSet";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PsychologyIcon from '@mui/icons-material/Psychology';
import ShareIcon from '@mui/icons-material/Share';

const arr = [
	{
		index: 1,
		icon: <BorderColorIcon sx={{ fontSize: 60 }} />,
		content: "Appointment every Wednesday 9am.",
	},
	{
		index: 2,
		icon: <PsychologyIcon sx={{ fontSize: 60 }} />,
		content: "First come, first served. Our offers are in limited quantities, so be quick.",
	},
	{
		index: 3,
		icon: <ShareIcon sx={{ fontSize: 60 }} />,
		content: "Appointment every Wednesday 9am.",
	},
];

function Home() {
	return (
		<Box>
			<Image
				src='https://cdn.pixabay.com/photo/2020/05/24/11/14/sea-5213746_1280.jpg'
				alt='sample'
			/>
			<Title title='How it works' titleColor='black' />
			<Stack direction='row' justifyContent='space-around'>
				{arr.map(({ index, icon, content }) => (
					<IconSet key={index} index={index} icon={icon} content={content} />
				))}
			</Stack>
		</Box>
	);
}

export default Home;
