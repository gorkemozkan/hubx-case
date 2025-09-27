import { FC } from 'react';
import { StyleSheet, Text, TextProps, View } from 'react-native';
import UiImage from '@/src/components/ui/UiImage';
import { Typography } from '@/src/theme';

interface Props extends TextProps {
  text: string;
  brushed?: boolean;
}

const CommonHighlightedText: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, props.style]}>{props.text}</Text>
      {props.brushed && (
        <View style={styles.brushContainer}>
          <UiImage
            contentFit="cover"
            source={require('@/assets/images/onboarding/Brush.png')}
            style={styles.brush}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  text: {
    fontSize: 28,
    letterSpacing: -1,
    fontFamily: Typography.rubik.extraBold,
  },
  brushContainer: {
    left: 0,
    right: 0,
    bottom: -12,
    position: 'absolute',
  },
  brush: {
    width: '100%',
    height: 12,
  },
});

export default CommonHighlightedText;
