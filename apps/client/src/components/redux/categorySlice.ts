import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productsOps } from '../../api/nodeEcommerce'
import {
  Category,
  CategoryResponse,
  CategoryState,
  ApiError,
} from '../../types/category.types'
import { RootState } from './rootSlice'

export const getCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response: CategoryResponse = await productsOps.getCategories();
      return response.categories?.reverse() || [];
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      return rejectWithValue(
        apiError.response
          ? apiError.response.data.message
          : 'An unknown error occurred'
      );
    }
  }
);

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.status = 'fulfilled';
      state.categories = action.payload.map((category) => ({
        ...category,
        products: [],
      }));
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.status = 'rejected';
      state.error = action.payload as string;
    });
  },
});

export default categorySlice.reducer
