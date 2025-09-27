import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingScreen from '@/src/screens/Onboarding/components/OnboardingScreen';

const Onboarding = () => (
  <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
    <OnboardingScreen />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Onboarding;
