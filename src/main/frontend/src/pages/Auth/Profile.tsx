import {
	Avatar,
	Box,
	Button,
	Card,
	Divider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";

// http://placekitten.com/200/200
function Profile() {
	return (
		<Stack direction='row' spacing={4}>
			<Card sx={{ width: 300, p: 2, textAlign: "center" }}>
				<Stack spacing={2}>
					<Avatar
						src='http://placekitten.com/300/200'
						sx={{ width: 60, height: 60, display: "block", margin: "auto" }}
					/>
					<Box>
						<Typography variant='h5' gutterBottom component='div'>
							Katarina Smith
						</Typography>
					</Box>
					<Box>
						<Typography variant='body2' gutterBottom component='div' mb={2}>
							Email Address
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ mt: 3, ml: 1, mb: 1 }}>
						{/* https://mui.com/material-ui/react-button/#upload-button */}
						<Button component='label'>
							Upload picture
							<input hidden accept='image/*' multiple type='file' />
						</Button>
					</Box>
				</Stack>
			</Card>
			<Card sx={{ m: 2, p: 2, width: 400 }}>
				<Box>
					<Typography variant='h5' gutterBottom component='div'>
						Profile
					</Typography>
				</Box>
				<Box>
					<Typography variant='body2' gutterBottom component='div' mb={4}>
						The information can be edited
					</Typography>
				</Box>
				<Divider />
				<Box component='form'>
					<Stack sx={{ mt: 2, mb: 1 }} spacing={2}>
						<TextField label='Nick name' id='outlined-size-normal' />
						<TextField label='Email Address' id='outlined-size-normal' />
						<TextField label='Phone Number' id='outlined-size-normal' />
						{/* https://mui.com/material-ui/react-button/#upload-button */}
						<Button component='label'>
							Upload Face Login Picture
							<input hidden accept='image/*' multiple type='file' />
						</Button>
					</Stack>
				</Box>
				<Divider />
				<Box sx={{ p: 2 }}>
					<Button variant='contained' sx={{ display: "block", margin: "auto" }}>
						프로필 저장하기
					</Button>
				</Box>
			</Card>
		</Stack>
	);
}

export default Profile;
