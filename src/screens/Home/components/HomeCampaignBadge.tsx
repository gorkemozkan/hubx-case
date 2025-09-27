import { StyleSheet, View } from 'react-native';
import { ChevronRight } from '@/src/components/icons';
import UiGradientText from '@/src/components/ui/UiGradientText';
import UiImage from '@/src/components/ui/UiImage';
import { Colors, Typography } from '@/src/theme';

const HomeCampaignBadge = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <UiImage source={require('@/assets/images/message.png')} width={36} height={36} />
        <View style={styles.content}>
          <UiGradientText
            direction="vertical"
            gradientStops={[
              { offset: '0%', color: Colors['amber-300'] },
              { offset: '100%', color: Colors['amber-600'] },
            ]}
          >
            FREE Premium Available
          </UiGradientText>
          <UiGradientText
            gradientStops={[
              { offset: '0%', color: Colors['amber-300'] },
              { offset: '100%', color: Colors['amber-600'] },
            ]}
            fontSize={13}
            lineHeight={16}
            letterSpacing={0}
            direction="vertical"
            fontFamily={Typography.sfProText.regular}
          >
            Tap to upgrade your account!
          </UiGradientText>
        </View>
      </View>
      <ChevronRight width={24} height={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    height: 64,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    backgroundColor: Colors['brown-900'],
  },
  inner: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    gap: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.white,
  },
  message: {
    width: 24,
    height: 24,
    flexBasis: 24,
    flexShrink: 0,
  },
});

export default HomeCampaignBadge;
