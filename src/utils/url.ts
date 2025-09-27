import { Alert, Linking } from 'react-native';

export async function openUrl(url: string | undefined | null): Promise<void> {
  try {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      Alert.alert('Error', 'Invalid link URL');
      return;
    }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this link. The URL format may not be supported.');
    }
  } catch (_error) {
    Alert.alert('Error', 'Failed to open link. Please try again later.');
  }
}
