import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UiButton from '@/src/components/ui/UiButton';
import useOnboarding from '@/src/hooks/useOnboarding';

const DiagnoseScreen = () => {
  const { handleNotComplete } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Diagnose</Text>
      <UiButton title="Not Completed" onPress={handleNotComplete} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DiagnoseScreen;
