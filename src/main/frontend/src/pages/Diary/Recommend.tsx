import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogProps,
	DialogTitle,
	Grid,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function Items() {
	const [items, setItems] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				setError(null);
				setItems(null);
				setLoading(null);
				const response = await axios.get(
					"https://api.sampleapis.com/coffee/hot"
				);
				setItems(response.data);
			} catch (e) {
				setError(e);
			}
			setLoading(false);
		};

		fetchItems();
	}, []);

	if (loading) return <div>loading...</div>;
	if (error) return <div>error 발생</div>;
	if (!items) return null;

	return (
		<Box>
			<Typography variant='h5'>추천 아이템</Typography>
			<Grid container spacing={4}>
				{items.map((item: any) => (
					<Grid key={item.title} item>
						<Card sx={{ width: 350, height: 300 }}>
							<CardActionArea>
								<CardMedia
									component='img'
									height='140'
									width='200'
									image={item.image}
									alt={item.title}
								/>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div'>
										{item.title}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{item.description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

function Recommend() {
	// dialog 설정
	const [open, setOpen] = React.useState(false);
	const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

	const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
		setOpen(true);
		setScroll(scrollType);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const descriptionElementRef = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<>
			<div onClick={handleClickOpen("paper")}>
				<Items />
			</div>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'>
				<DialogTitle id='scroll-dialog-title'>상품 설명</DialogTitle>
				<DialogContent dividers={scroll === "paper"}>
					<img style={{width: '100%'}} src="https://ai.esmplus.com/mymiroom/01_page/6541page.jpg"/>
					<DialogContentText
						id='scroll-dialog-description'
						ref={descriptionElementRef}
						tabIndex={-1}>
						이미지에 대한 설명
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined">취소</Button>
					<Button onClick={handleClose} variant="contained">장바구니</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Recommend;
