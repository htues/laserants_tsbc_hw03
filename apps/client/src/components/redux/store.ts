import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
    });

export type AppDispatch = typeof store.dispatch;    

export default store;