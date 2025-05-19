import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const apiSliceFound = createApi({
    reducerPath: "founds",
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
    tagTypes: ["Found"],
 endpoints: () => ({
        
    }),
});

export default apiSliceFound;





    
   
     