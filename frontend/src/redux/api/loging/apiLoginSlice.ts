
import { LoginResponse, LogInUser } from "../../../interfaces/models";
import apiSliceLogin from "./apiSliceLogin";
const apiLoginSlice = apiSliceLogin.injectEndpoints({
    endpoints: (builder) => ({
        getAllLogins: builder.query<LogInUser[], void>({
            query: () => "/login",
            providesTags: ["LogInUser"],
        }),
        getLoginById: builder.query<LogInUser, string>({
            query: (_id) => `/login/${_id}`,
            providesTags: ["LogInUser"],
        }),
        addLogin: builder.mutation<LoginResponse, LogInUser>({
            query: (updateLog) => ({
                url: "/login",
                method: "POST",
                body: updateLog,
            }),
            invalidatesTags: ["LogInUser"],
        }),
        updateLogin: builder.mutation<LogInUser, LogInUser>({
            query: (updateLog) => ({
                url: `/login/${updateLog._id}`,
                method: "PUT",
                body: updateLog,
            }),
            invalidatesTags: ["LogInUser"],
        }),
        deleteLogin: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/login/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["LogInUser"],
        }),
    }),
});

export const {
    useGetAllLoginsQuery,
    useGetLoginByIdQuery,
    useAddLoginMutation,
    useUpdateLoginMutation,
    useDeleteLoginMutation,
} = apiLoginSlice;
export default apiLoginSlice