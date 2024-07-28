import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCart, selectCart } from "../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { FaCheck } from "react-icons/fa";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Complete = () => {
  const cartData = useSelector(selectCart);
  const orderValue = {}; // Manually fill this with your order data
  const method = localStorage.getItem("method") || "unknown";
  const totalAmount = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleComplete = () => {
    dispatch(deleteAllCart());
    navigate("/");
  };

  useEffect(() => {
    if (!orderValue || !cartData.length) {
      navigate("/cart");
    }
  }, [orderValue, cartData.length, navigate]);

  useEffect(() => {
    return () => {
      handleComplete();
    };
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" gutterBottom>
        Complete!
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <FaCheck />
          <Typography variant="body1">Shopping cart</Typography>
        </Box>
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <FaCheck />
          <Typography variant="body1">Complete details</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">3</Typography>
          <Typography variant="body1">Order complete</Typography>
        </Box>
      </Box>
      <Typography variant="h2" gutterBottom>
        Thank you! 🎉
      </Typography>
      <Typography variant="h1" gutterBottom>
        Your order has been received
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 3 }}>
        {cartData.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 200, m: 1 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.images[0]}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {product.quantity}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 3 }}>
        <Box component="li" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Order code:</Typography>
          <Typography variant="h3">#0123_45678</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Date:</Typography>
          <Typography variant="h3">July 26, 2024</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Total:</Typography>
          <Typography variant="h3">{totalAmount}</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Payment method:</Typography>
          <Typography variant="h3">{method}</Typography>
        </Box>
      </Box>
      <Button
        onClick={handleComplete}
        variant="contained"
        color="primary"
      >
        Purchase history
      </Button>
    </Box>
  );
};

export default memo(Complete);
