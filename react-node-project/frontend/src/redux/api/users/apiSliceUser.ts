import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from '../../../utils/cookieUtils' 

const apiSliceUser = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include', 
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User"],
    endpoints: () => ({}),
});

export default apiSliceUser;