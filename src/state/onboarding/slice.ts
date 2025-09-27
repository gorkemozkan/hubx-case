import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface OnboardingState {
  isCompleted: boolean;
}

const initialState: OnboardingState = {
  isCompleted: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setIsCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
  },
});

export const { setIsCompleted } = onboardingSlice.actions;

export default onboardingSlice.reducer;
