import { Found } from "../../../interfaces/models";
import apiSliceUser from "./apiSliceUsersFounds";
const apiUsersFoundsSlice = apiSliceUser.injectEndpoints({
    endpoints: (builder) => ({
        getFoundsByIdUser: builder.query<Found[], string>({
            query: (_id) => ({
                url: `/foundsUser/${_id}`,
            providesTags: ["Found"],
            }),

        })
    }),
});
export const {
    useGetFoundsByIdUserQuery
} = apiUsersFoundsSlice;
export default apiUsersFoundsSlice