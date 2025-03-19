import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import apiFoundSlice from './api/apiFoundSlice';
import apiLostSlice from './api/apiLostSlice';
import apiUserSlice from './api/apiUserSlice';
const store=configureStore({
    reducer:{
        [apiLostSlice.reducerPath]: apiSlice.reducer,
        [apiUserSlice.reducerPath]: apiSlice.reducer,
        [apiFoundSlice.reducerPath]: apiSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
