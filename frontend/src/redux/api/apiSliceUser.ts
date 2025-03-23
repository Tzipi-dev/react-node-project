import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSliceUser = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/users' }),
    tagTypes: ["User"],
    endpoints: ()=>({})
})

export default apiSliceUser
