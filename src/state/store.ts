import { configureStore } from '@reduxjs/toolkit';
import { categoriesApi } from '@/src/services/categories';
import { questionsApi } from '@/src/services/questions';
import onboardingReducer from '@/src/state/onboarding/slice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionsApi.middleware, categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
