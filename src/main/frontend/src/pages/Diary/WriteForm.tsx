import { Box, TextField, Button, Stack } from "@mui/material";
import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

function WriteForm() {
	return (
		<Box>
			<Box
				component='form'
				sx={{
					"& .MuiTextField-root": { m: 1, width: "50ch" },
				}}
				noValidate
				autoComplete='off'
        mb={2}>
				<TextField
					label='제목을 입력하세요'
					id='standard-size-normal'
					variant='standard'
				/>
			</Box>
			<Box>
				<SunEditor
					lang='ko'
					// defaultValue='<p>내용을 입력하세요</p>'
					placeholder='내용을 입력하세요'
					width='100%'
					height='300px'
				/>
			</Box>
			<Stack
				direction='row'
				spacing={4}
        mt={2}
				justifyContent='center'
				alignItems='center'>
				<Button variant='contained' size='medium' color='primary' >
					일기 저장하기
				</Button>
				<Button variant='contained' size='medium' color='warning'>
					취소
				</Button>
			</Stack>
		</Box>
	);
}

export default WriteForm;
