import { FC, ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UiImage from '@/src/components/ui/UiImage';

interface Props {
  body: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HEADER_PADDING_TOP = 12;

const OnboardingScreenLayout: FC<Props> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + HEADER_PADDING_TOP }]}>
      <View style={styles.header}>{props.header}</View>
      <View style={styles.body}>{props.body}</View>
      <View style={styles.footer}>{props.footer}</View>
      <UiImage
        style={styles.image}
        width={screenWidth}
        height={screenHeight}
        source={require('@/assets/images/onboarding/onboarding-background.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 24,
    height: 100,
  },
  body: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 24,
  },
  image: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    position: 'absolute',
  },
});

export default OnboardingScreenLayout;
