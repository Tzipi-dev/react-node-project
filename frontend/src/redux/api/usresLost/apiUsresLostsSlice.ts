import { Lost } from "../../../interfaces/models";
import apiSliceUser from "./apiSliceUsersLosts";
const apiUsersLostsSlice = apiSliceUser.injectEndpoints({
    endpoints: (builder) => ({
        getLostsByIdUser: builder.query<Lost[], string>({
            query: (_id) => ({
                url: `/lostsUser/${_id}`,
                providesTags: ["Lost"],
            }),

        })
    }),
});
export const {
  useGetLostsByIdUserQuery
} = apiUsersLostsSlice;
export default apiUsersLostsSlice