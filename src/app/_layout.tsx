import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/src/components/common/ErrorBoundary';
import { store } from '@/src/state/store';
import { TypographySource } from '@/src/theme';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    'Rubik-Light': require('../../assets/fonts/Rubik-Light.otf'),
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.otf'),
    'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.otf'),
    'Rubik-SemiBold': require('../../assets/fonts/Rubik-SemiBold.otf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.otf'),
    'Rubik-ExtraBold': require('../../assets/fonts/Rubik-ExtraBold.otf'),
    'SF-Pro-Display-Light': require('../../assets/fonts/SF-Pro-Display-Light.otf'),
    'SF-Pro-Display-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Pro-Display-Medium': require('../../assets/fonts/SF-Pro-Display-Medium.otf'),
    'SF-Pro-Display-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
    'SF-Pro-Display-Black': require('../../assets/fonts/SF-Pro-Display-Black.otf'),
    'SF-Pro-Text-Regular': require('../../assets/fonts/SF-Pro-Text-Regular.otf'),
    'SF-Pro-Text-Semibold': require('../../assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SF-Pro-Text-Bold': require('../../assets/fonts/SF-Pro-Text-Bold.otf'),
    'SF-Pro': require('../../assets/fonts/SF-Pro.ttf'),
    'Visby-Thin': require('../../assets/fonts/VisbyThin.otf'),
    'Visby-Light': require('../../assets/fonts/VisbyLight.otf'),
    'Visby-Regular': require('../../assets/fonts/VisbyRegular.otf'),
    'Visby-Medium': require('../../assets/fonts/VisbyMedium.otf'),
    'Visby-Semibold': require('../../assets/fonts/VisbySemibold.otf'),
    'Visby-Bold': require('../../assets/fonts/VisbyBold.otf'),
    'Visby-Extrabold': require('../../assets/fonts/VisbyExtrabold.otf'),
    'Visby-Heavy': require('../../assets/fonts/VisbyHeavy.otf'),
  } as TypographySource);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary context="RootLayout">
      <ThemeProvider value={DefaultTheme}>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
          <StatusBar style="auto" />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default RootLayout;
