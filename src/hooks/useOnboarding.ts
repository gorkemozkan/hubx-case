import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/src/constants';
import { useAppDispatch, useAppSelector } from '@/src/state/hooks';
import { setIsCompleted } from '@/src/state/onboarding/slice';
import { RootState } from '@/src/state/store';
import { getData, storeData } from '@/src/utils/async-storage';

const useOnboarding = () => {
  const dispatch = useAppDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const isCompleted = useAppSelector((state: RootState) => state.onboarding.isCompleted);

  const setOnboardingStatus = async (completed: boolean) => {
    dispatch(setIsCompleted(completed));
    await storeData(STORAGE_KEYS.ONBOARDING_STATUS, completed.toString());
  };

  const handleComplete = () => setOnboardingStatus(true);
  const handleNotComplete = () => setOnboardingStatus(false);

  useEffect(() => {
    getData(STORAGE_KEYS.ONBOARDING_STATUS).then((data) => {
      dispatch(setIsCompleted(data === 'true'));
      setIsLoaded(true);
    });
  }, [dispatch]);

  return {
    isLoaded,
    isCompleted,
    handleComplete,
    handleNotComplete,
  };
};

export default useOnboarding;
