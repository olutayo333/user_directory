import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<any, { pageNumber: number; pageSize: number; }>({
      query: ({ pageNumber, pageSize, }) =>
        `?page=${pageNumber}&results=${pageSize}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: arg.pageNumber }],
      //keepUnusedDataFor: 60, // optional caching duration (seconds)
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
