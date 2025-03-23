import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSliceFound = createApi({
    reducerPath: "founds",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ["Found"],
    endpoints: ()=>({})
})

export default apiSliceFound
