import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;