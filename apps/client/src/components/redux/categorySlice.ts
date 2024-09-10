import { createAsyncThunk } from '@reduxjs/toolkit'
import { productsOps } from '../../api/nodeEcommerce'
import {
  Category,
  CategoryResponse,
  CategoryState,
  ApiError,
} from '../../types/category.types'
import { RootState } from './rootSlice'

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response: CategoryResponse = await productsOps.getCategories()
      return response.categories?.reverse()
    } catch (error) {
      const apiError: ApiError = error as ApiError
      return rejectWithValue(
        apiError.response
          ? apiError.response.data.message
          : 'An unknown error occurred',
      )
    }
  },
)

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
      state.status = 'loading'
      state.error = null
  });

  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.loading = false
    state.status = 'fulfilled'
    state.categories = (
      action.payload as Category[]
    ).map((category) => {
      return {
        ...category,
        products: [],
      }
    });
    )
  });

  builder.addCase(getCategories.rejected, (state, action) => {
    state.loading = false
    state.status = 'rejected'
    state.error = action.error.message as string
  });
}

export default categorySlice.reducer