import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../config/UrlBase'

// Define a service using a base URL and expected endpoints
export const LoginApi = createApi({
  reducerPath: 'LoginApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url:"/api/login",
        method:"POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = LoginApi