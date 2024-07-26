import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import cartReducer from './features/cart/cartSlice'; // Add this line

const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer, // Add this line
  },
});

export default store;
