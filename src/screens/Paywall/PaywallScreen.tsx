import { router } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CommonCancelCross from '@/src/components/common/CommonCancelCross';
import CommonSegmentedTitle from '@/src/components/common/CommonSegmentedTitle';
import UiImage from '@/src/components/ui/UiImage';
import useOnboarding from '@/src/hooks/useOnboarding';
import PaywallScreenFeaturesCarousel from '@/src/screens/Paywall/PaywallScreenFeaturesCarousel';
import PaywallScreenSubscriptionPackageSelection from '@/src/screens/Paywall/PaywallScreenSubscriptionPackageSelection';
import PaywallSubscriptionTerms from '@/src/screens/Paywall/PaywallSubscriptionTerms';
import { Colors, getColorWithOpacity, Typography } from '@/src/theme';

const PaywallScreen = () => {
  const { handleComplete } = useOnboarding();

  const insets = useSafeAreaInsets();

  const { height: screenHeight } = useWindowDimensions();

  const plantImageHeight = screenHeight * 0.6;

  const handleSkip = () => {
    handleComplete();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cancelCrossContainer, { top: insets.top, right: 24 }]}>
        <CommonCancelCross onPress={handleSkip} />
      </View>
      <View style={[styles.plantImageContainer, { height: plantImageHeight }]}>
        <UiImage style={styles.plantImage} source={require('@/assets/images/paywall/plant.png')} />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.contentWrapper} />
        <View style={styles.innerBottomContainer}>
          <CommonSegmentedTitle
            containerStyle={styles.titleContainer}
            description="Access All Features"
            descriptionStyle={styles.description}
            segments={[
              { text: 'PlantApp ', highlighted: true, style: styles.titleHighlighted },
              { text: 'Premium', style: styles.titleNormal },
            ]}
          />
          <View style={styles.innerMiddleContainer}>
            <PaywallScreenFeaturesCarousel />
          </View>
          <View style={styles.subscriptionContainer}>
            <PaywallScreenSubscriptionPackageSelection />
            <PaywallSubscriptionTerms containerStyle={styles.subscriptionTerms} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  plantImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    zIndex: 2,
  },
  contentWrapper: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
    display: 'flex',
  },
  titleHighlighted: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: 'bold',
    color: Colors.white,
    letterSpacing: 0.07,
    fontFamily: Typography.visby.heavy,
  },
  titleNormal: {
    fontSize: 27,
    lineHeight: 34,
    color: Colors.white,
    fontFamily: Typography.rubik.light,
  },
  description: {
    fontSize: 17,
    opacity: 0.7,
    lineHeight: 24,
    letterSpacing: 0.38,
    color: getColorWithOpacity(Colors.white, 70),
    fontFamily: Typography.rubik.light,
  },
  scannerContainer: {
    width: 100,
    height: 100,
  },
  subscriptionTerms: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  innerBottomContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  innerMiddleContainer: {
    paddingLeft: 20,
    marginBottom: 24,
    paddingRight: 0,
  },
  cancelCrossContainer: {
    position: 'absolute',
    zIndex: 3,
  },
  subscriptionContainer: {
    paddingHorizontal: 20,
  },
});

export default PaywallScreen;
