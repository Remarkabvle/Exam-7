import { createSlice } from '@reduxjs/toolkit';

// Function to load the wishlist from local storage
const loadWishlistFromLocalStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

// Function to save the wishlist to local storage
const saveWishlistToLocalStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

const initialState = loadWishlistFromLocalStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
      saveWishlistToLocalStorage(state); // Save to local storage
    },
    removeFromWishlist: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload);
      saveWishlistToLocalStorage(newState); // Save to local storage
      return newState;
    },
    setWishlist: (state, action) => {
      saveWishlistToLocalStorage(action.payload); // Save to local storage
      return action.payload;
    }
  }
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export const selectWishlist = state => state.wishlist;
export default wishlistSlice.reducer;
    