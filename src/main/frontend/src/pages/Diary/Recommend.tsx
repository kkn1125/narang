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
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserProvider";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import { dummies } from "../../tools/utils";

interface ItemsProps {
  handleClickOpen?: (item: Product, scrollType: DialogProps["scroll"]) => void;
}

function Items({ handleClickOpen }: ItemsProps) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://api.sampleapis.com/coffee/hot",
        );
        setItems(
          response.data.map((dt: any) => ({
            id: dt.id,
            name: dt.title,
            category:
              typeof dt.ingredients === "string"
                ? dt.ingredients
                    .split(",")
                    .map((_: string) => _.trim())
                    .join("_")
                : dt.ingredients.join("_"),
            content: dt.description,
            seller: "dobby",
            thumbnail: dt.image,
            price: 10000,
            amount: 50,
            isSoldOut: false,
          })),
        );
      } catch (e) {
        console.log(e);
        setError(e);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (error) return <div>error 발생</div>;

  return (
    <Box>
      <Typography variant='h4' gutterBottom sx={{ fontWeight: 700 }}>
        추천 아이템
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Stack
        direction='row'
        justifyContent='space-between'
        flexWrap='wrap'
        columnGap={2}
        rowGap={5}>
        {loading &&
          dummies.map((dummy, idx) => (
            <Skeleton
              key={idx}
              animation='wave'
              variant='rectangular'
              sx={{
                flex: {
                  xs: "45%",
                  md: "20%",
                },
              }}
              height={200}
            />
          ))}
        {items.map((item, idx: number) => (
          <Card
            key={idx}
            onClick={() => handleClickOpen(item, "paper")}
            sx={{
              flex: {
                xs: "45%",
                md: "20%",
              },
            }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                width='200'
                image={item.thumbnail}
                alt={item.name}
              />
              <CardContent sx={{ height: 60 }}>
                <Typography gutterBottom variant='h6' component='div'>
                  {item.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

function Recommend() {
  // dialog 설정
  const [open, setOpen] = useState(false);
  const [user, dispatch] = useContext(UserContext);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const [product, setProduct] = useState<any>({});

  const handleClickOpen = (
    item: Product,
    scrollType: DialogProps["scroll"],
  ) => {
    setOpen(true);
    setScroll(scrollType);
    setProduct(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInsert = (productId: string) => {
    const cart = new Cart();
    cart.set("uid", user.id);
    cart.set("pid", productId);
    cart.set("amount", 1);
    cart.set("isOrdered", false);
    console.log(cart);
    const formData = cart.makeFormData();
    // insertCart(formData);
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
      <Items handleClickOpen={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'>
        <DialogTitle id='scroll-dialog-title'>{product.name}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <img style={{ width: "100%" }} src={product.thumbnail} />
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}>
            {product.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            취소
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleInsert(product.id);
            }}
            variant='contained'>
            장바구니
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Recommend;
