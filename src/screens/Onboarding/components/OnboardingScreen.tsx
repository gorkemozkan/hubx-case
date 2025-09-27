import { router } from 'expo-router';
import { ReactNode, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import CommonAcceptanceText from '@/src/components/common/CommonAcceptanceText';
import CommonDotsIndicator from '@/src/components/common/CommonDotsIndicator';
import CommonSegmentedTitle from '@/src/components/common/CommonSegmentedTitle';
import UiButton from '@/src/components/ui/UiButton';
import UiImage from '@/src/components/ui/UiImage';
import OnboardingScreenLayout from '@/src/screens/Onboarding/components/OnboardingScreenLayout';
import { Colors, getColorWithOpacity, SemanticColors, Spacing, Typography } from '@/src/theme';

enum OnboardingSteps {
  GET_STARTED,
  ONBOARDING_1,
  ONBOARDING_2,
}

interface Step {
  nextButtonText: string;
  title: ReactNode;
  image: ImageSourcePropType;
}

const OnboardingScreen = () => {
  const [step, setStep] = useState(OnboardingSteps.GET_STARTED);

  const steps = {
    [OnboardingSteps.GET_STARTED]: {
      nextButtonText: 'Get Started',
      image: require('@/assets/images/onboarding/onboarding1.png'),
      title: (
        <CommonSegmentedTitle
          description={
            <View>
              <Text style={styles.descriptionText}>Identify more than 3000+ plants and</Text>
              <Text style={styles.descriptionText}>88% accuracy.</Text>
            </View>
          }
          segments={[
            {
              text: 'Welcome to ',
              style: styles.welcomeText,
            },
            { text: 'PlantApp', highlighted: true, style: styles.getStartedHighlightedText },
          ]}
        />
      ),
    },
    [OnboardingSteps.ONBOARDING_1]: {
      nextButtonText: 'Continue',
      image: require('@/assets/images/onboarding/onboarding2.png'),
      title: (
        <CommonSegmentedTitle
          segments={[
            {
              text: 'Take a photo to ',
              style: styles.onboarding2Text,
            },
            { text: 'identify', highlighted: true, brushed: true },
            {
              text: 'the plant!',
              style: styles.onboarding2Text,
            },
          ]}
        />
      ),
    },
    [OnboardingSteps.ONBOARDING_2]: {
      nextButtonText: 'Continue',
      image: require('@/assets/images/onboarding/onboarding3.png'),
      title: (
        <CommonSegmentedTitle
          segments={[
            { text: 'Get plant ' },
            { text: 'care guides', highlighted: true, brushed: true },
          ]}
          containerStyle={styles.titleWithShadow}
        />
      ),
    },
  } as Record<OnboardingSteps, Step>;

  const currentStep = steps[step];

  const totalSteps = Object.keys(steps).length;

  const activeIndex = step - 1;

  const handleNext = () => {
    if (step === OnboardingSteps.ONBOARDING_2) {
      router.replace('/(paywall)');
      return;
    }

    setStep(step + 1);
  };

  return (
    <OnboardingScreenLayout
      header={currentStep.title}
      body={
        <View style={styles.imageContainer}>
          <UiImage source={currentStep.image} style={styles.image} contentFit="cover" />
        </View>
      }
      footer={
        <View>
          <UiButton title={currentStep.nextButtonText} onPress={handleNext} />
          <View style={styles.footerContent}>
            {step === OnboardingSteps.GET_STARTED ? (
              <CommonAcceptanceText containerStyle={styles.acceptanceText} />
            ) : (
              <CommonDotsIndicator
                activeIndex={activeIndex}
                totalCount={totalSteps}
                containerStyle={styles.dotsIndicator}
              />
            )}
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  acceptanceText: {
    maxWidth: 232,
    alignSelf: 'center',
    marginTop: Spacing.md,
  },
  dotsIndicator: {
    marginTop: Spacing.xl,
  },
  footerContent: {
    height: 50,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: 28,
    letterSpacing: 0.07,
    fontFamily: Typography.rubik.regular,
  },
  titleWithShadow: {
    elevation: 3,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
  },
  getStartedHighlightedText: {
    fontSize: 28,
    letterSpacing: 0.07,
    fontFamily: Typography.rubik.semiBold,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.07,
    fontFamily: Typography.rubik.regular,
    color: getColorWithOpacity(Colors['gray-850'], 70),
  },
  onboarding2Text: {
    fontSize: 28,
    letterSpacing: -1,
    fontFamily: Typography.rubik.medium,
    color: SemanticColors.text,
  },
});

export default OnboardingScreen;
