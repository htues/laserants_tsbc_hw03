import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/scart.types';

type ShoppingCartState = {
  cartItems: CartItem[];
};

const initialState: ShoppingCartState = {
  cartItems: [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseItem: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItem: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addItem, increaseItem, decreaseItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;