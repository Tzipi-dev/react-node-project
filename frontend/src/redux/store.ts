import { configureStore } from "@reduxjs/toolkit";
import apiFoundSlice from './api/apiFoundSlice';
import apiLostSlice from './api/apiLostSlice';
import apiUserSlice from './api/apiUserSlice';
import apiSlice from "./api/apiSliceUser";
import apiSliceLost from "./api/apiSliceLost";
import apiSliceUser from "./api/apiSliceUser";
import apiSliceFound from "./api/apiSliceFound";
const store=configureStore({
    reducer:{
        [apiLostSlice.reducerPath]: apiSliceLost.reducer,
        [apiUserSlice.reducerPath]: apiSliceUser.reducer,
        [apiFoundSlice.reducerPath]: apiSliceFound.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
