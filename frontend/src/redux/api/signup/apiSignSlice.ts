import { User } from "../../../interfaces/models";
import apiSliceSign from "./apiSliceSign";
const apiSignSlice = apiSliceSign.injectEndpoints({
    endpoints: (builder) => ({
        getAllSigns: builder.query<User[], void>({
            query: () => "/signup",
            providesTags: ["User"],
        }),
        getSignById: builder.query<User, string>({
            query: (_id) => `/signup/${_id}`,
            providesTags: ["User"],
        }),
        addSign: builder.mutation<User, User>({
            query: (newSign) => ({
                url: "/signup",
                method: "POST",
                body: newSign,
            }),
            invalidatesTags: ["User"],
        }),
        updateSign: builder.mutation<User, User>({
            query: (updateSign) => ({
                url: `/signup/${updateSign._id}`,
                method: "PUT",
                body: updateSign,
            }),
            invalidatesTags: ["User"],
        }),
        deleteSign: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/signup/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetAllSignsQuery,
    useGetSignByIdQuery,
    useAddSignMutation,
    useUpdateSignMutation,
    useDeleteSignMutation,
} = apiSignSlice;
export default apiSignSlice