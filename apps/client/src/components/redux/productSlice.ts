import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productsOps } from '../../api/nodeEcommerce'
import {
  Product,
  ProductResponse,
  ProductState,
  ApiError,
} from '../../types/product.types'
import { RootState } from './rootSlice'
import { setSelectedCategory } from './categorySlice'

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  status: 'idle',
  error: null,
  searchQuery: '',
  categoryId: 0,
}

export const getProducts = createAsyncThunk<
  Product[],
  number | undefined,
  { rejectValue: string }
>('products/getProducts', async (categoryId, { rejectWithValue }) => {
  try {
    const response: Product[] = await productsOps.getProducts(categoryId)

    const products = response.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    return products
  } catch (error) {
    const apiError: ApiError = error as ApiError
    return rejectWithValue(
      apiError.response
        ? apiError.response.data.message
        : 'An unknown error occurred',
    )
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    sortProductsLowToHigh: (state) => {
      state.products = [...state.products].sort((a, b) => a.price - b.price)
    },
    sortProductsHighToLow: (state) => {
      state.products = [...state.products].sort((a, b) => b.price - a.price)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true
        state.status = 'loading'
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false
          state.status = 'fulfilled'
          state.products = action.payload
        },
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.status = 'rejected'
        state.error = action.payload as string
      })
      .addCase(setSelectedCategory, (state, action) => {
        state.categoryId = action.payload ?? 0;
      });      
  },
})

export const { sortProductsLowToHigh, sortProductsHighToLow, setSearchQuery } =
  productSlice.actions

export default productSlice.reducer
