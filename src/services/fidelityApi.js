import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "fidelityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gist.githubusercontent.com/techerjeansebastienpro/",
  }),
  endpoints: (builder) => ({
    getFidelity: builder.query({
      query: () =>
        "a71c41c32b5a4307217af02f31b02b3d/raw/19e6c2109fa56d75bb0140fc45fe7c52f5b6b40e/fidelity.json",
    }),
  }),
});

export const { useGetFidelityQuery } = api;
