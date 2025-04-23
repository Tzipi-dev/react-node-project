import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from '../../../utils/cookieUtils';

const apiSliceCity = createApi({
  reducerPath: "addFound",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      console.log('Token from cookie:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["String"],
  endpoints: (builder) => ({ // <-- תקן כאן
    getAllCities: builder.query<Array<string>, void>({
      query: () => "/addFound", // הנתיב אליו תישלח הבקשה ביחס ל-baseUrl
      // providesTags: ["String"],
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
} = apiSliceCity;

export default apiSliceCity;