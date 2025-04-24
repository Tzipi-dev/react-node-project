import apiFoundSlice from './api/founds/apiFoundSlice';
import apiLostSlice from './api/losts/apiLostSlice';
import apiUserSlice from './api/users/apiUserSlice';
import apiSliceLost from "./api/losts/apiSliceLost";
import apiSliceUser from "./api/users/apiSliceUser";
import apiSliceFound from "./api/founds/apiSliceFound";
import foundSlice from './slice/foundSlice';
import lostsSlice from './slice/lostsSlice';
import userSlice from './slice/userSlice'
import currentuser from './slice/currentuser'
import { configureStore } from '@reduxjs/toolkit';
import apiLoginSlice from './api/loging/apiLoginSlice';
import apiCitiesSlice from './api/cities/apiCitiesSlice';
const store = configureStore({
  reducer: {
    [apiLostSlice.reducerPath]: apiSliceLost.reducer,
    [apiUserSlice.reducerPath]: apiSliceUser.reducer,
    [apiFoundSlice.reducerPath]: apiSliceFound.reducer,
    [apiLoginSlice.reducerPath]:apiLoginSlice.reducer,
    [apiCitiesSlice.reducerPath]:apiCitiesSlice.reducer,
    foundSlice: foundSlice,
    lostsSlice:lostsSlice,
    user:userSlice,
    currentUserSlice: currentuser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSliceLost.middleware,
      apiSliceUser.middleware,
      apiSliceFound.middleware,
      apiLoginSlice.middleware,
    apiCitiesSlice.middleware,
  )
});

export default store;
export type RootState = ReturnType<typeof store.getState>;