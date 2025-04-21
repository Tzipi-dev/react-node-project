// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const apiSliceFound = createApi({
//   reducerPath: "founds",
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000',
//     credentials: 'include', // קרדנציאלים לכל בקשה
//     prepareHeaders: (headers, { getState }) => {
//       const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Found"],
//   endpoints: () => ({}),
// });

// export default apiSliceFound;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from '../../../utils/cookieUtils';

const apiSliceFound = createApi({
    reducerPath: "founds",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include', // חשוב לשלוח את העוגיות בצד הלקוח
        prepareHeaders: (headers) => {
            const token = getCookie('token');
            console.log('Token from cookie:', token); // נוודא שהטוקן נשלח
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // שולח את הטוקן ב־Authorization header
            }
            return headers;
        },
    }),
    tagTypes: ["Found"],
    endpoints: () => ({}),
});

export default apiSliceFound;

