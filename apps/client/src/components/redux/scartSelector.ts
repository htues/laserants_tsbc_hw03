import { RootState } from './rootSlice'

export const selectCartItems = (state: RootState) =>
  state.shoppingCart.cartItems

export const selectSubtotal = (state: RootState) =>
  state.shoppingCart.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

export const selectTaxes = (state: RootState) => selectSubtotal(state) * 0.15

export const selectTotal = (state: RootState) =>
  selectSubtotal(state) + selectTaxes(state)
