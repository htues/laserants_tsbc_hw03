import { RootState } from "./rootSlice";

export const selectProducts = (state: RootState) => state.products.products;