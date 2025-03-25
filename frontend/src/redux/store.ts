import apiFoundSlice from './api/founds/apiFoundSlice';
import apiLostSlice from './api/losts/apiLostSlice';
import apiUserSlice from './api/users/apiUserSlice';

import apiSliceLost from "./api/losts/apiSliceLost";
import apiSliceUser from "./api/users/apiSliceUser";
import apiSliceFound from "./api/founds/apiSliceFound";
import foundSlice from './slice/foundSlice';
import { configureStore } from '@reduxjs/toolkit';
import apiLoginSlice from './api/loging/apiLoginSlice';

const store = configureStore({
  reducer: {
    [apiLostSlice.reducerPath]: apiSliceLost.reducer,
    [apiUserSlice.reducerPath]: apiSliceUser.reducer,
    [apiFoundSlice.reducerPath]: apiSliceFound.reducer,
    [apiLoginSlice.reducerPath]:apiLoginSlice.reducer,
    foundSlice: foundSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSliceLost.middleware,
      apiSliceUser.middleware,
      apiSliceFound.middleware,
      apiLoginSlice.middleware)
});

export default store;