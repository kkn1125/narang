import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
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
      <Typography variant='h5'>
        추천 아이템
      </Typography>
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
	return <Items />;
}

export default Recommend;
