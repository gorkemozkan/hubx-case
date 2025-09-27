import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery, STANDARD_CACHE_DURATION } from '@/src/services/base';
import type { ApiResponse, Category } from '@/src/types';

export interface GetCategoriesParams {
  page?: number;
  pageSize?: number;
}

export type CategoriesResponse = ApiResponse<Category[]>;

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, GetCategoriesParams>({
      query: (params = { page: 1, pageSize: 25 }) => {
        const { page = 1, pageSize = 25 } = params;
        return {
          url: '/getCategories',
          params: { page, pageSize },
        };
      },
      keepUnusedDataFor: STANDARD_CACHE_DURATION,
      transformResponse: (response: CategoriesResponse) => {
        return {
          ...response,
          data: response.data.sort((a, b) => a.rank - b.rank),
        };
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
