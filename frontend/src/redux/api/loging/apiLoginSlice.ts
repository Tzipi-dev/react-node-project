
import { LogInUser } from "../../../interfaces/models";
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
        addLogin: builder.mutation<LogInUser, LogInUser>({
            query: (newLost) => ({
                url: "/login",
                method: "POST",
                body: newLost,
            }),
            invalidatesTags: ["LogInUser"],
        }),
        updateLogin: builder.mutation<LogInUser, LogInUser>({
            query: (updateLost) => ({
                url: `/login/${updateLost._id}`,
                method: "PUT",
                body: updateLost,
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