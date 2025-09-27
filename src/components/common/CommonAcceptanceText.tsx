import { FC } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, getColorWithOpacity, Typography } from '@/src/theme';

interface Props {
  containerStyle?: ViewStyle;
}

const CommonAcceptanceText: FC<Props> = (props) => {
  return (
    <View style={props.containerStyle}>
      <Text style={styles.text}>
        By tapping next, you are agreeing to PlantID <Text style={styles.link}>Terms of Use</Text> &{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    letterSpacing: 0.07,
    fontFamily: Typography.rubik.regular,
    color: getColorWithOpacity(Colors['sage-700'], 70),
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default CommonAcceptanceText;
