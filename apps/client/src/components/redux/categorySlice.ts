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
    console.log('Axios response data:', response)

    if (!response) {
      console.log('Categories are undefined or null')
      return []
    }

    const categories = response.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    console.log('Processed categories:', categories) // Log the processed categories
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
        console.log('Action payload:', action.payload) // Log the action payload
        state.categories = action.payload.map((category) => ({
          ...category,
          products: [],
        }))
        console.log('Fetched categories on the store:', state.categories) // Add logging
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.status = 'rejected'
        state.error = action.payload as string
        console.error('Failed to fetch categories:', action.error.message) // Add logging
      })
  },
})

export default categorySlice.reducer
