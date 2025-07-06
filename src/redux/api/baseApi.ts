import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
