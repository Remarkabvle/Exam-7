// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { productsApi } from './services/products';
import productsReducer from './features/products/productsSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import cartReducer from './features/cart/cartSlice';
import categoriesReducer from './features/categories/categoriesSlice';

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
    initializeAuth(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      }
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    auth: authSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;
