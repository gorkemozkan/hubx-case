import { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UiImage from '@/src/components/ui/UiImage';
import UiInput from '@/src/components/ui/UiInput';
import { Colors, getColorWithOpacity, SemanticColors, Typography } from '@/src/theme';

const getTimeBasedGreeting = (): { text: string; emoji: string } => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { text: 'Good Morning!', emoji: '🌅' };
  } else if (hour >= 12 && hour < 18) {
    return { text: 'Good Afternoon!', emoji: '⛅' };
  } else {
    return { text: 'Good Evening!', emoji: '🌙' };
  }
};

const HomeHeader: FC = () => {
  const greeting = useMemo(() => getTimeBasedGreeting(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, plant lover!</Text>
      <Text style={styles.subtitle}>
        {greeting.text} {greeting.emoji}
      </Text>
      <UiInput placeholder="Search for plants" />
      <UiImage
        contentFit="contain"
        style={styles.leafLeft}
        source={require('@/assets/images/leaf-left.png')}
      />
      <UiImage
        width={90}
        height={90}
        contentFit="contain"
        style={styles.leafRight}
        source={require('@/assets/images/leaf-right.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 14,
    borderBottomWidth: 1,
    position: 'relative',
    paddingHorizontal: 24,
    borderBottomColor: getColorWithOpacity(Colors['gray-700'], 10),
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
    letterSpacing: 0.07,
    color: SemanticColors.text,
    fontFamily: Typography.rubik.regular,
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 14,
    letterSpacing: 0.35,
    color: SemanticColors.text,
    fontFamily: Typography.rubik.medium,
  },
  leafLeft: {
    left: 0,
    bottom: -12,
    zIndex: -1,
    width: 90,
    height: 90,
    position: 'absolute',
  },
  leafRight: {
    right: 0,
    bottom: -12,
    zIndex: -1,
    width: 90,
    height: 90,
    position: 'absolute',
  },
  message: {
    width: 24,
    height: 24,
    flexBasis: 24,
    flexShrink: 0,
  },
});

export default HomeHeader;
