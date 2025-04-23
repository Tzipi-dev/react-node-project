import apiSliceCity from "./apiSliceCities";

const apiCitiesSlice = apiSliceCity.injectEndpoints({
  endpoints: (builder) => ({
    getAllCities: builder.query<Array<string>, void>({ 
      query: () => "/addFound",
      // providesTags: ["String"], // הסרה או התאמה של providesTags
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
} = apiCitiesSlice; 

export default apiCitiesSlice;