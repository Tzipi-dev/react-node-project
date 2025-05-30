import apiFoundSlice from './api/founds/apiFoundSlice';
import apiLostSlice from './api/losts/apiLostSlice';
import apiUserSlice from './api/users/apiUserSlice';
import apiSliceLost from "./api/losts/apiSliceLost";
import apiSliceUser from "./api/users/apiSliceUser";
import apiSliceFound from "./api/founds/apiSliceFound";
import apiSliceCity from "./api/cities/apiSliceCities";
import foundSlice from './slice/foundSlice';
import lostsSlice from './slice/lostsSlice';
import userSlice from './slice/userSlice'
import currentuser from './slice/currentuser'
import { configureStore } from '@reduxjs/toolkit';
import apiLoginSlice from './api/loging/apiLoginSlice';
import apiUsersLostsSlice from './api/usresLost/apiUsresLostsSlice';
import apiSliceUsersLosts from './api/usresLost/apiSliceUsersLosts';
import apiUsersFoundsSlice from './api/usersFound/apiUsersFoundsSlice';
import apiSliceUsersFounds from './api/usersFound/apiSliceUsersFounds';
import apiCitiesSlice from './api/cities/apiCitiesSlice';


const store = configureStore({
  reducer: {
    [apiLostSlice.reducerPath]: apiSliceLost.reducer,
    [apiUserSlice.reducerPath]: apiSliceUser.reducer,
    [apiFoundSlice.reducerPath]: apiSliceFound.reducer,
    [apiLoginSlice.reducerPath]:apiLoginSlice.reducer,
    [apiUsersLostsSlice.reducerPath]: apiSliceUsersLosts.reducer,
    [apiUsersFoundsSlice.reducerPath]:apiSliceUsersFounds.reducer,
    [apiCitiesSlice.reducerPath]:apiSliceCity.reducer,
    foundSlice: foundSlice,
    lostsSlice:lostsSlice,
    user: currentuser, 
    usersData: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSliceLost.middleware,
      apiSliceUser.middleware,
      apiSliceFound.middleware,
      apiLoginSlice.middleware,
     apiSliceUsersLosts.middleware,
     apiSliceUsersFounds.middleware,
     apiSliceCity.middleware
  )
});
export default store;