// wishlistSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    setWishlist: (state, action) => {
      return action.payload;
    }
  }
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export const selectWishlist = state => state.wishlist;
export default wishlistSlice.reducer;
