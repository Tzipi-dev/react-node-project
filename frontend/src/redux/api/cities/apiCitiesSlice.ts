import apiSliceCity from "./apiSliceCities";

const apiCitiesSlice = apiSliceCity.injectEndpoints({
  endpoints: (builder) => ({
    getAllCities: builder.query<Array<string>, void>({
      query: () => "/cities",
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
} = apiCitiesSlice;

export default apiCitiesSlice;