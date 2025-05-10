
import { LoginResponse, User } from "../../../interfaces/models";
import ResetPassword from "../../../pages/ResetPassword";
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
    addUser: builder.mutation<LoginResponse, User>({
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
    forgotPassword: builder.mutation<{ message: string }, string>({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

   resetPassword: builder.mutation<{ message: string },{ token: string; password: string } >({
      query: ({ token, password }) => ({
        url: "/users/reset-password",
        method: "POST",
        body: { token, password },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = apiUserSlice;
export default apiUserSlice