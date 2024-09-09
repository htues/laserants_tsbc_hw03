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
        return rejectWithValue((error as ApiError).response.data.message)
        }
    },
)