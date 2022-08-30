import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const items = [
  {
    name: "TÄRNABY 테르나뷔",
    type: "탁상스탠드",
    price: 24900,
    amount: 5,
    src: "https://www.ikea.com/kr/ko/images/products/taernaby-table-lamp-anthracite__1105554_ph166557_s5.jpg?f=xl",
  },
  {
    name: "NÄSSELKLOCKA 네셀클로카",
    type: "이불커버+베개커버",
    price: 39900,
    amount: 5,
    src: "https://www.ikea.com/kr/ko/images/products/naesselklocka-duvet-cover-and-pillowcase-light-grey-green-multicolour__1127978_ph185859_s5.jpg?f=xl",
  },
];

function Cart() {
  const [selectAmount, setSelectAmount] = useState(
    new Array(items.length).fill("1"),
  );

  const handleSelectAmount = (e: SelectChangeEvent, ids: number) => {
    setSelectAmount(
      selectAmount.map((sel, idx) => {
        const target = e.target;
        // console.log(target.value);
        if (idx === ids) {
          return target.value;
        }
        return sel;
      }),
    );
  };

  return (
    <>
      <FormGroup sx={{ gap: 5 }}>
        {items.map(({ name, type, price, amount, src }, ids) => (
          <Stack
            component={Paper}
            elevation={5}
            key={name}
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            sx={{ gap: 5, p: 7 }}>
            <Stack
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
              sx={{ flex: 1, gap: 5 }}>
              <Box sx={{ height: "100%", width: 250 }}>
                <CardMedia
                  component='img'
                  height='180'
                  width='250'
                  image={src}
                  alt={name}
                />
              </Box>

              <Box>
                <Typography variant='h5'>{name}</Typography>
                <Typography variant='body1'>{type}</Typography>
                <Typography variant='body1'>
                  {price.toLocaleString()}원
                </Typography>
                {/* https://mui.com/material-ui/react-select/#main-content */}
              </Box>
              <FormControl
                sx={{
                  mt: 5,
                  minWidth: 240,
                  flexDirection: "row",
                  gap: 2,
                }}
                variant='standard'>
                <InputLabel id={name + "-" + ids}>수량</InputLabel>
                <Select
                  labelId={name + "-" + ids}
                  id={name + "-" + ids}
                  label='수량'
                  value={selectAmount[ids]}
                  onChange={(e: SelectChangeEvent) =>
                    handleSelectAmount(e, ids)
                  }
                  sx={{
                    minWidth: 200,
                  }}>
                  <MenuItem value=''>
                    <em>-</em>
                  </MenuItem>
                  {new Array(amount).fill(0).map((i, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      {idx + 1}
                    </MenuItem>
                  ))}
                </Select>
                <Button variant='outlined'>삭제</Button>
              </FormControl>
            </Stack>

            <Typography variant='h6'>
              {(price * Number(selectAmount[ids])).toLocaleString()}원
            </Typography>

            <FormControl>
              <Checkbox />
            </FormControl>
          </Stack>
        ))}

        <Stack direction='row' justifyContent='flex-end' alignItems='center'>
          <Box>
            <Typography variant='body1'>총 주문금액</Typography>
            <Typography variant='h6'>
              {selectAmount
                .reduce(
                  (acc, cur, idx) => (acc += items[idx].price * Number(cur)),
                  0,
                )
                .toLocaleString()}
              원
            </Typography>
          </Box>
          <Box sx={{ m: 3, textAlign: "right" }}>
            <Button variant='contained' size='large'>
              결제하기
            </Button>
          </Box>
        </Stack>
      </FormGroup>
    </>
  );
}

export default Cart;
