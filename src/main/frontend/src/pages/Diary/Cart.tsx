import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

function Cart() {
  return (
    <>
      <FormGroup>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
              <TableRow>
                <TableCell align='center'>
                  <FormControl>
                    <CheckBox />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Box sx={{ height: 200, width: 200 }}>
                    <CardMedia
                      component='img'
                      height='140'
                      width='150'
                      image='https://www.ikea.com/kr/ko/images/products/taernaby-table-lamp-anthracite__1105554_ph166557_s5.jpg?f=xl'
                      alt='TÄRNABY 테르나뷔'
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='h5'>TÄRNABY 테르나뷔</Typography>
                  <Typography variant='body1'>탁상스탠드</Typography>
                  <Typography variant='body1'>24,900원</Typography>
                  {/* https://mui.com/material-ui/react-select/#main-content */}
                  <FormControl sx={{ mt: 5, minWidth: 240 }} variant='standard'>
                    <Stack direction='row' spacing={2}>
                      <InputLabel id='amount-select-label'>수량</InputLabel>
                      <Select
                        labelId='amount-select-label'
                        id='amount-select-label'>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                      <Button variant='outlined'>삭제</Button>
                    </Stack>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>24,900원</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <CheckBox />
                </TableCell>
                <TableCell>
                  <Box sx={{ height: 140, width: 200 }}>
                    <CardMedia
                      component='img'
                      height='140'
                      width='150'
                      image='https://www.ikea.com/kr/ko/images/products/naesselklocka-duvet-cover-and-pillowcase-light-grey-green-multicolour__1127978_ph185859_s5.jpg?f=xl'
                      alt='NÄSSELKLOCKA 네셀클로카'
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='h5'>NÄSSELKLOCKA 네셀클로카</Typography>
                  <Typography variant='body1'>이불커버+베개커버</Typography>
                  <Typography variant='body1'>39,900원</Typography>
                  {/* https://mui.com/material-ui/react-select/#main-content */}
                  <FormControl sx={{ mt: 5, minWidth: 240 }} variant='standard'>
                    <Stack direction='row' spacing={2}>
                      <Box>
                        <InputLabel id='amount-select-label'>수량</InputLabel>
                        <Select
                          labelId='amount-select-label'
                          id='amount-select-label'>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </Box>
                      <Box>
                        <Button variant='outlined'>삭제</Button>
                      </Box>
                    </Stack>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>39,900원</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>
                  <Typography variant='body1'>총 주문금액</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>64,800원</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ m: 3, textAlign: "right" }}>
          <Button variant='contained' size='large'>
            결제하기
          </Button>
        </Box>
      </FormGroup>
    </>
  );
}

export default Cart;
