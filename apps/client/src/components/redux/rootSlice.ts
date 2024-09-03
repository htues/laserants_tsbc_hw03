import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;