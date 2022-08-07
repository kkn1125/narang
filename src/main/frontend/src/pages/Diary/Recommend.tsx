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
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { insertCart } from "../../apis/cart";
import OverflowContent from "../../components/atoms/OverflowContent";
import { UserContext } from "../../contexts/UserProvider";
import Cart from "../../models/Cart";

interface ItemsType {
  title?: string;
  image?: string;
  description?: string;
}

interface ItemsProps {
  handleClickOpen?: (
    item: ItemsType,
    scrollType: DialogProps["scroll"],
  ) => void;
}

function Items({ handleClickOpen }: ItemsProps) {
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
          "https://api.sampleapis.com/coffee/hot",
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
        {items.map((item: ItemsType, idx: number) => (
          <Grid key={idx} item onClick={() => handleClickOpen(item, "paper")}>
            <Card
              sx={{
                width: 350,
                //  height: 300
              }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  width='200'
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ height: 60 }}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {item.title}
                  </Typography>
                  {/* <OverflowContent limit={100}>
                    {item.description}
                  </OverflowContent> */}
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
  const [user, dispatch] = useContext(UserContext);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const [product, setProduct] = React.useState<ItemsType>({});

  const handleClickOpen = (
    item: ItemsType,
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
    cart.set('uid', user.id);
    cart.set('pid', productId);
    cart.set('amount', 1);
    cart.set('isOrdered', false);
    
    const formData = cart.makeFormData();
    insertCart(formData);
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
        <DialogTitle id='scroll-dialog-title'>{product.title}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <img style={{ width: "100%" }} src={product.image} />
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}>
            {product.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            취소
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleInsert(product.title);
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
