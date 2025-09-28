import { StyleSheet, View } from 'react-native';
import { ChevronRight } from '@/src/components/icons';
import UiGradientText from '@/src/components/ui/UiGradientText';
import UiImage from '@/src/components/ui/UiImage';
import { Colors, Typography } from '@/src/theme';

const HomeCampaignBadge = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <UiImage
          source={require('@/assets/images/message.png')}
          width={54}
          height={54}
          contentFit="contain"
        />
        <View style={styles.content}>
          <UiGradientText
            direction="vertical"
            gradientStops={[
              { offset: '0%', color: Colors['amber-300'] },
              { offset: '100%', color: Colors['amber-600'] },
            ]}
          >
            {[
              { text: 'FREE', fontFamily: Typography.sfProText.bold },
              { text: ' Premium Available', fontFamily: Typography.sfProText.semiBold },
            ]}
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
            {[{ text: 'Tap to upgrade your account!', fontFamily: Typography.sfProText.regular }]}
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
    display: 'flex',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
    backgroundColor: Colors['brown-900'],

    justifyContent: 'space-between',
    width: '100%',
  },
  inner: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    gap: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.white,
  },
});

export default HomeCampaignBadge;
