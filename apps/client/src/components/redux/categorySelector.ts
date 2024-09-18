import { RootState } from './rootSlice'

export const selectCategories = (state: RootState) =>
  state.categories.categories
