import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from '../../../utils/cookieUtils'

const apiSliceFound = createApi({
    reducerPath: "founds",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Found"],
    endpoints: () => ({}),
});

export default apiSliceFound;