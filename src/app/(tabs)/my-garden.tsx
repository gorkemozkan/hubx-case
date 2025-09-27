import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyGardenScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>My Garden</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyGardenScreen;
