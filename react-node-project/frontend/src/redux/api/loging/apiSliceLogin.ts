import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const apiSliceLogin = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include', 
        prepareHeaders: (headers) => {
            const token = cookies.get('token'); 
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["LogInUser"],
    endpoints: () => ({}),
});

export default apiSliceLogin;