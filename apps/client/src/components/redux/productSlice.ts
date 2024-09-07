import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  products: [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 10.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 12.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 15.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Description for product 4',
      price: 9.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Description for product 5',
      price: 8.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Description for product 6',
      price: 11.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Description for product 7',
      price: 13.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Description for product 8',
      price: 14.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      name: 'Product 9',
      description: 'Description for product 9',
      price: 16.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 10,
      name: 'Product 10',
      description: 'Description for product 10',
      price: 17.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ],
  searchQuery: ''
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    sortProductsLowToHigh: (state) => {
      state.products = state.products.sort((a, b) => a.price - b.price)
    },
    sortProductsHighToLow: (state) => {
      state.products = state.products.sort((a, b) => b.price - a.price)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  
  },
})

export const { sortProductsLowToHigh, sortProductsHighToLow, setSearchQuery } = productSlice.actions

export default productSlice.reducer