import apiFoundSlice from './api/apiFoundSlice';
import apiLostSlice from './api/apiLostSlice';
import apiUserSlice from './api/apiUserSlice';

import apiSliceLost from "./api/apiSliceLost";
import apiSliceUser from "./api/apiSliceUser";
import apiSliceFound from "./api/apiSliceFound";
import foundSlice from './slice/foundSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [apiLostSlice.reducerPath]: apiSliceLost.reducer,
    [apiUserSlice.reducerPath]: apiSliceUser.reducer,
    [apiFoundSlice.reducerPath]: apiSliceFound.reducer,
    foundSlice: foundSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiFoundSlice.middleware), 
});

export default store;