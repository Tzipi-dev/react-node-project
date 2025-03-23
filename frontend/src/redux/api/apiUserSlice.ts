
import { User } from "../../interfaces/models";
import apiSliceUser from "./apiSliceUser";



const apiUserSlice = apiSliceUser.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => "/users",
            providesTags: ["User"],
        }),
        getUserById: builder.query<User, string>({
            query: (_id) => `/users/${_id}`,
            providesTags: ["User"],
        }),
        addUser: builder.mutation<User, User>({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation<User, User>({
            query: (updateUser) => ({
                url: `/users/${updateUser._id}`,
                method: "PUT",
                body: updateUser,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/users/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = apiUserSlice;
export default apiUserSlice