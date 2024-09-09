import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import productReducer from "./productSlice";
import scartReducer from "./scartSlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    products: productReducer,
    shoppingCart: scartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;