import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSliceLost = createApi({
    reducerPath: "losts",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ["Lost"],
    endpoints: ()=>({})
})

export default apiSliceLost

