import { Box, TextField, Button, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

function WriteForm() {
	const editor = useRef<SunEditorCore>();
	const [formData, setFormData] = useState({title: ''});
	
	const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.currentTarget;
		setFormData({...formData, [name]: value});
	}

	// The sunEditor parameter will be set to the core suneditor instance when this function is called
	const getSunEditorInstance = (sunEditor: SunEditorCore) => {
		editor.current = sunEditor;
	};

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
					onChange={handleFormData}
					value={formData['title']}
					name='title'
				/>
			</Box>
			<Box>
				<SunEditor
					lang='ko'
					// defaultValue='<p>내용을 입력하세요</p>'
					placeholder='내용을 입력하세요'
					width='100%'
					height='300px'
					getSunEditorInstance={getSunEditorInstance}
				/>
			</Box>
			<Stack
				direction='row'
				spacing={4}
				mt={2}
				justifyContent='center'
				alignItems='center'>
				<Button
					variant='contained'
					size='medium'
					color='primary'
					onClick={() => {
						// console.log(editor.current?.getContents(true));
						// console.log(formData);
						alert(JSON.stringify({
							title: formData.title,
							content: editor.current?.getContents(true),
							regdate: Date.now()
						}, null, 2))
					}}>
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
