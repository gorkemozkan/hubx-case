import { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { Search } from '@/src/components/icons';
import { Colors, getColorWithOpacity, Typography } from '@/src/theme';

export interface Props extends Omit<TextInputProps, 'style'> {
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const UiInput: FC<Props> = ({
  style,
  inputStyle,
  placeholder,
  placeholderTextColor,
  ...textInputProps
}) => {
  return (
    <View style={[styles.containerStyles, style]}>
      <Search width={20} height={20} />
      <TextInput
        placeholder={placeholder}
        style={[styles.inputStyles, inputStyle]}
        placeholderTextColor={placeholderTextColor ?? Colors['gray-450']}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    borderWidth: 0.2,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
    backgroundColor: getColorWithOpacity(Colors.white, 88),
    borderColor: getColorWithOpacity(Colors['gray-700'], 25),
  },
  inputStyles: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15.5,
    letterSpacing: 0.07,
    color: Colors['gray-950'],
    fontFamily: Typography.rubik.regular,
  },
});
export default UiInput;
