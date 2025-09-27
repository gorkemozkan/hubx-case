import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CancelCross } from '@/src/components/icons';
import { Colors, getColorWithOpacity } from '@/src/theme';
import { triggerHaptic } from '@/src/utils/haptic';

interface Props {
  onPress: () => void;
}

const CommonCancelCross: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      hitSlop={10}
      onPress={() => {
        triggerHaptic('medium');
        props.onPress();
      }}
    >
      <CancelCross />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColorWithOpacity(Colors.black, 40),
  },
});

export default CommonCancelCross;
