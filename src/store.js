import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
