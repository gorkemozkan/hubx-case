import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery, STANDARD_CACHE_DURATION } from '@/src/services/base';
import type { Question } from '@/src/types';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], void>({
      keepUnusedDataFor: STANDARD_CACHE_DURATION,
      query: () => `/getQuestions`,
      transformResponse: (data: Question[]) => {
        return data.sort((a, b) => a.order - b.order);
      },
    }),
  }),
});

export const { useGetQuestionsQuery } = questionsApi;
