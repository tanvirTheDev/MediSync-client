import { TDoctor } from "@/types";
import { TSpecialty } from "@/types/specialities";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const specialistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialists: build.mutation({
      query: (data) => ({
        url: "/specialities",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialisties],
    }),
    getSpecialists: build.query({
      query: () => ({
        url: "/specialities",
        method: "GET",
      }),
      transformResponse: (response: TSpecialty[]) => {
        return response;
      },
      providesTags: [tagTypes.specialisties],
    }),
    getDoctorBySpecialists: build.query({
      query: (id: string) => ({
        url: "/specialities/:id",
        method: "GET",
      }),
      transformResponse: (response: TDoctor[]) => {
        return response;
      },
      providesTags: [tagTypes.specialisties],
    }),
    deleteSpecialists: build.mutation({
      query: (id) => ({
        url: `/specialities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialisties],
    }),
  }),
});

export const {
  useCreateSpecialistsMutation,
  useGetSpecialistsQuery,
  useDeleteSpecialistsMutation,
  useGetDoctorBySpecialistsQuery,
} = specialistsApi;
