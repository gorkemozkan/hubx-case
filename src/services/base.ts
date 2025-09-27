import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getBaseUrl = (): string => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error(`EXPO_PUBLIC_API_URL is not defined.
  - Create a .env file and add the API URL.
  - Example: EXPO_PUBLIC_API_URL=https://api.example.com/api
`);
  }

  return baseUrl;
};

export const createBaseQuery = () => fetchBaseQuery({ baseUrl: getBaseUrl() });

export const STANDARD_CACHE_DURATION = 60 * 5;
