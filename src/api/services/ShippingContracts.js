import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../config/UrlBase";

// Define a service using a base URL and expected endpoints
export const ShippingContracts = createApi({
  reducerPath: "ShippingContracts",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["ShippingContracts"],
  endpoints: (builder) => ({
    shippingContractsList: builder.query({
      query: () => ({
        url: "/api/shipping-contract",
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["ShippingContracts"],
    }),

    shippingContractsGetEdit: builder.query({
      query: (id) => ({
        url: "/api/shipping-contract/" + id,
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      providesTags: ["ShippingContracts"],
    }),

    addShippingContracts: builder.mutation({
      query: (body) => ({
        url: "/api/shipping-contract",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body,
      }),
      invalidatesTags: ["ShippingContracts"],
    }),

    updateShippingContracts: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/api/shipping-contract/" + id,
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body,
      }),
      invalidatesTags: ["ShippingContracts"],
    }),

    delteteShippingContracts: builder.mutation({
      query: (id) => ({
        url: "/api/shipping-contract/" + id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["ShippingContracts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useShippingContractsListQuery,
  useAddShippingContractsMutation,
  useDelteteShippingContractsMutation,
  useShippingContractsGetEditQuery,
  useUpdateShippingContractsMutation,
} = ShippingContracts;
