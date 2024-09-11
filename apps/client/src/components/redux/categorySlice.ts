import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productsOps } from '../../api/nodeEcommerce'
import {
  Category,
  CategoryResponse,
  CategoryState,
  ApiError,
} from '../../types/category.types'
import { RootState } from './rootSlice'

const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  status: 'idle',
  error: null,
}

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const response: Category[] = await productsOps.getCategories()

    const categories = response.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    return categories
  } catch (error) {
    const apiError: ApiError = error as ApiError
    return rejectWithValue(
      apiError.response
        ? apiError.response.data.message
        : 'An unknown error occurred',
    )
  }
})

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true
        state.status = 'loading'
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'fulfilled'
        state.categories = action.payload.map((category) => ({
          ...category,
          products: [],
        }))
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.status = 'rejected'
        state.error = action.payload as string
      })
  },
})

export default categorySlice.reducer
