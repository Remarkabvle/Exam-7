// features/products/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://66458542b8925626f8921939.mockapi.io/api/v1/products');
    const data = await response.json();
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await fetch(`https://66458542b8925626f8921939.mockapi.io/api/v1/products/${productId}`);
    const data = await response.json();
    return data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct) => {
    const response = await fetch('https://66458542b8925626f8921939.mockapi.io/api/v1/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteProductById = createAsyncThunk(
  'products/deleteProductById',
  async (productId) => {
    const response = await fetch(`https://66458542b8925626f8921939.mockapi.io/api/v1/products/${productId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return productId;
    } else {
      throw new Error('Failed to delete product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct) => {
    const response = await fetch(`https://66458542b8925626f8921939.mockapi.io/api/v1/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state) => state.products.product;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
