import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CommonCarousel from '@/src/components/common/CommonCarousel';
import { Leaves, Scanner, SpeedMeter } from '@/src/components/icons';
import { Colors, getColorWithOpacity, Typography } from '@/src/theme';

interface FeatureItem {
  title: string;
  description: string;
  image?: ReactNode;
}

const items: FeatureItem[] = [
  {
    title: 'Unlimited',
    description: 'Plant Identify.',
    image: <Scanner width={18} height={18} />,
  },
  {
    title: 'Faster',
    description: 'Process',
    image: <SpeedMeter width={17} height={17} />,
  },
  {
    title: 'Detailed',
    description: 'Plant Care',
    image: <Leaves width={16} height={16} />,
  },
];

const PaywallScreenFeaturesCarousel = () => {
  const renderFeatureItem = (item: FeatureItem) => (
    <BlurView intensity={16} style={styles.container}>
      <View style={styles.imageContainer}>{item.image}</View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </BlurView>
  );

  return (
    <CommonCarousel
      spacing={8}
      items={items}
      itemWidth={156}
      renderItem={renderFeatureItem}
      keyExtractor={(item) => item.title?.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 156,
    height: 130,
    padding: 16,
    borderRadius: 14,
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    backgroundColor: getColorWithOpacity(Colors.white, 8),
  },
  imageContainer: {
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColorWithOpacity(Colors.black, 24),
  },
  title: {
    fontSize: 20,
    marginTop: 16,
    lineHeight: 24,
    letterSpacing: 0.38,
    color: Colors.white,
    fontFamily: Typography.rubik.medium,
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
    letterSpacing: -0.08,
    fontFamily: Typography.rubik.regular,
    color: getColorWithOpacity(Colors.white, 70),
  },
});

export default PaywallScreenFeaturesCarousel;
