import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaywallScreen from '@/src/screens/Paywall/PaywallScreen';
import { Colors } from '@/src/theme';

const Paywall = () => {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <PaywallScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['gray-950'],
  },
});

export default Paywall;
