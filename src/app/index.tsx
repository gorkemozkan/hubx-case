import { Redirect } from 'expo-router';
import useOnboarding from '@/src/hooks/useOnboarding';

const Index = () => {
  const { isLoaded, isCompleted } = useOnboarding();

  if (!isLoaded) {
    return null;
  }

  if (isCompleted) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(onboarding)" />;
};

export default Index;
