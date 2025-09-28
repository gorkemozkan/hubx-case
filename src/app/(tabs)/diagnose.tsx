import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiagnoseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Diagnose</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DiagnoseScreen;
