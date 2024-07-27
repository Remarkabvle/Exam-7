import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL for the API
const API_URL = 'https://66458542b8925626f8921939.mockapi.io/api/v1/categories';

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

// Fetch a category by ID
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId) => {
    const response = await fetch(`${API_URL}/${categoryId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

// Create a new category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (newCategory) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

// Delete a category by ID
export const deleteCategoryById = createAsyncThunk(
  'categories/deleteCategoryById',
  async (categoryId) => {
    const response = await fetch(`${API_URL}/${categoryId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return categoryId;
  }
);

// Update a category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (updatedCategory) => {
    const response = await fetch(`${API_URL}/${updatedCategory.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

export const selectAllCategories = (state) => state.categories.categories;
export const selectCategoryById = (state) => state.categories.category;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;
