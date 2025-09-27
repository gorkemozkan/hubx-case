import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery, STANDARD_CACHE_DURATION } from '@/src/services/base';
import type { Category } from '@/src/types';

export interface CategoriesResponse {
  data: Category[] | [];
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `/getCategories`,
      keepUnusedDataFor: STANDARD_CACHE_DURATION,
      transformResponse: (response: CategoriesResponse) => {
        return response.data.sort((a, b) => a.rank - b.rank);
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
